import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { PrismaService } from '../../modules/prisma/prisma.service';

@Injectable()
export class TenantMiddleware implements NestMiddleware {
  constructor(private readonly prisma: PrismaService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    // El organizationId viene del JWT decodificado por Passport (si la ruta es protegida)
    // O podemos intentar extraerlo del header si fuera necesario antes del guard.
    // En este monorepo, el Guard inyecta el user en req.user
    
    const user = req['user'] as any;
    const orgId = user?.orgId;

    if (orgId) {
      // SET LOCAL solo dura la transacción si estamos en una.
      // Para NestJS, usaremos el queryRaw para setear la variable de sesión en la conexión actual.
      await this.prisma.$executeRawUnsafe(`SET app.current_org_id = '${orgId}'`);
    }

    next();
  }
}
