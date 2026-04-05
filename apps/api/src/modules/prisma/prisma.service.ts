import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@impacta/database';
import { TenantContext } from '../../common/context/tenant-context';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  constructor() {
    super();
    // Extend client with RLS logic (optional: could also use middleware)
    this.$use(async (params, next) => {
      const orgId = TenantContext.getOrgId();
      if (orgId) {
        // SET LOCAL only works within a transaction. 
        // For standard queries, we can use a raw command if needed, 
        // but session sticks for the connection if pool allows it.
        // For NestJS, it is safer to use transactional isolation or explicit filters.
        await this.$executeRawUnsafe(`SET app.current_org_id = '${orgId}'`);
      }
      return next(params);
    });
  }

  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
