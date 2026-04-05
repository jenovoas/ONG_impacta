import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { randomUUID } from 'crypto';
import { PrismaService } from '../prisma/prisma.service';
import * as argon2 from 'argon2';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private config: ConfigService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.prisma.user.findFirst({
      where: { email },
      include: { organization: true, customRole: true },
    });

    if (user && (await argon2.verify(user.passwordHash, pass))) {
      const { passwordHash, ...result } = user;
      return result;
    }
    return null;
  }

  async login(loginDto: LoginDto) {
    const user = await this.validateUser(loginDto.email, loginDto.password);
    if (!user) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const payload = {
      sub: user.id,
      orgId: user.organizationId,
      role: user.systemRole,
      permissions: user.customRole?.permissions || [],
    };

    const accessToken = this.jwtService.sign(payload);

    const refreshToken = await this.prisma.refreshToken.create({
      data: {
        userId: user.id,
        token: crypto.randomUUID(),
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
    });

    return {
      accessToken,
      refreshToken: refreshToken.token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        systemRole: user.systemRole,
        organization: {
          id: user.organization.id,
          name: user.organization.name,
          slug: user.organization.slug,
        },
      },
    };
  }

  async getCurrentUser(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: { organization: true },
    });

    if (!user) {
      throw new UnauthorizedException('Usuario no encontrado');
    }

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      systemRole: user.systemRole,
      organization: {
        id: user.organization.id,
        name: user.organization.name,
        slug: user.organization.slug,
      },
    };
  }

  async refresh(refreshToken: string) {
    const storedToken = await this.prisma.refreshToken.findUnique({
      where: { token: refreshToken },
      include: { user: { include: { organization: true, customRole: true } } },
    });

    if (!storedToken || storedToken.expiresAt < new Date()) {
      if (storedToken) {
        await this.prisma.refreshToken.delete({
          where: { id: storedToken.id },
        });
      }
      throw new UnauthorizedException('Token de refresh inválido o expirado');
    }

    const payload = {
      sub: storedToken.user.id,
      orgId: storedToken.user.organizationId,
      role: storedToken.user.systemRole,
      permissions: storedToken.user.customRole?.permissions || [],
    };

    const accessToken = this.jwtService.sign(payload, {
      expiresIn: this.config.get('JWT_ACCESS_EXPIRES_IN') || '15m',
    });

    await this.prisma.refreshToken.delete({ where: { id: storedToken.id } });

    const newRefreshToken = await this.prisma.refreshToken.create({
      data: {
        userId: storedToken.user.id,
        token: crypto.randomUUID(),
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
    });

    return {
      accessToken,
      refreshToken: newRefreshToken.token,
      user: {
        id: storedToken.user.id,
        name: storedToken.user.name,
        email: storedToken.user.email,
        systemRole: storedToken.user.systemRole,
        organization: {
          id: storedToken.user.organization.id,
          name: storedToken.user.organization.name,
          slug: storedToken.user.organization.slug,
        },
      },
    };
  }
}
