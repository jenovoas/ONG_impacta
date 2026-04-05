import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@impacta/database';
import { TenantContext } from '../../common/context/tenant-context';

// Modelos que requieren RLS (Row-Level Security)
const RLS_MODELS = [
  'Member',
  'Volunteer',
  'Event',
  'Donation',
  'DonationCampaign',
  'Raffle',
  'Task',
  'SocialBeneficiary',
  'EcologyProject',
  'Species',
  'Account',
  'JournalEntry',
  'AuditLog',
];

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor() {
    super();
  }

  async onModuleInit() {
    await this.$connect();
    this.setupRLSMiddleware();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }

  /**
   * Configura middleware para inyectar organizationId automáticamente
   * desde TenantContext en operaciones de lectura/escritura.
   */
  private setupRLSMiddleware() {
    this.$use(async (params, next) => {
      const orgId = TenantContext.getOrgId();

      // Solo aplicar RLS si hay un tenant activo
      if (!orgId) {
        return next(params);
      }

      // Solo aplicar a modelos que requieren RLS
      if (!RLS_MODELS.includes(params.model)) {
        return next(params);
      }

      // Inyectar organizationId en operaciones de escritura
      if (params.action === 'create' || params.action === 'upsert') {
        params.args.data = {
          ...params.args.data,
          organizationId: orgId,
        };
      }

      // Inyectar organizationId en filtros de lectura
      if (
        params.action === 'findMany' ||
        params.action === 'findFirst' ||
        params.action === 'findUnique' ||
        params.action === 'count' ||
        params.action === 'update' ||
        params.action === 'updateMany' ||
        params.action === 'delete' ||
        params.action === 'deleteMany'
      ) {
        params.args.where = {
          ...params.args.where,
          organizationId: orgId,
        };
      }

      return next(params);
    });
  }
}
