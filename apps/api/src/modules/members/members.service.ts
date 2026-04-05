import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@impacta/database';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { ListMembersDto } from './dto/list-members.dto';

@Injectable()
export class MembersService {
  constructor(private prisma: PrismaService) {}

  private buildWhere(
    orgId: string,
    filters: ListMembersDto,
  ): Prisma.MemberWhereInput {
    const where: Prisma.MemberWhereInput = {
      organizationId: orgId,
    };

    if (filters.status) {
      where.status = filters.status;
    }

    if (filters.search) {
      where.OR = [
        { name: { contains: filters.search, mode: 'insensitive' } },
        { email: { contains: filters.search, mode: 'insensitive' } },
        { rut: { contains: filters.search, mode: 'insensitive' } },
        { memberNumber: { contains: filters.search, mode: 'insensitive' } },
      ];
    }

    return where;
  }

  async findAll(orgId: string, filters: ListMembersDto) {
    const page = filters.page ?? 1;
    const perPage = filters.perPage ?? 10;
    const skip = (page - 1) * perPage;

    const where = this.buildWhere(orgId, filters);

    const [items, total] = await this.prisma.$transaction([
      this.prisma.member.findMany({
        where,
        skip,
        take: perPage,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.member.count({ where }),
    ]);

    return {
      data: items,
      meta: {
        page,
        perPage,
        total,
        totalPages: Math.ceil(total / perPage),
      },
    };
  }

  async findOne(orgId: string, id: string) {
    const member = await this.prisma.member.findFirst({
      where: { id, organizationId: orgId },
    });

    if (!member) {
      throw new NotFoundException('Miembro no encontrado');
    }

    return member;
  }

  async create(orgId: string, dto: CreateMemberDto) {
    return this.prisma.member.create({
      data: {
        organizationId: orgId,
        name: dto.name,
        email: dto.email,
        rut: dto.rut,
        phone: dto.phone,
        address: dto.address,
        city: dto.city,
        region: dto.region,
        birthDate: dto.birthDate ? new Date(dto.birthDate) : undefined,
        memberSince: dto.memberSince ? new Date(dto.memberSince) : undefined,
        memberNumber: dto.memberNumber,
        membershipType: dto.membershipType,
        cargo: dto.cargo,
        notes: dto.notes,
        avatarUrl: dto.avatarUrl,
        status: dto.status,
        monthlyFee:
          dto.monthlyFee !== undefined
            ? new Prisma.Decimal(dto.monthlyFee)
            : undefined,
      },
    });
  }

  async update(orgId: string, id: string, dto: UpdateMemberDto) {
    await this.findOne(orgId, id);

    return this.prisma.member.update({
      where: { id },
      data: {
        ...dto,
        birthDate: dto.birthDate ? new Date(dto.birthDate) : undefined,
        memberSince: dto.memberSince ? new Date(dto.memberSince) : undefined,
        monthlyFee:
          dto.monthlyFee !== undefined
            ? new Prisma.Decimal(dto.monthlyFee)
            : undefined,
      },
    });
  }

  async remove(orgId: string, id: string) {
    await this.findOne(orgId, id);
    await this.prisma.member.delete({ where: { id } });
    return { success: true };
  }
}
