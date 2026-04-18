import { Test } from '@nestjs/testing';
import { OrganizationsService } from './organizations.service';
import { DatabaseService } from '../../database/database.service';

describe('OrganizationsService', () => {
  let service: OrganizationsService;
  let db: {
    base: { organization: { create: jest.Mock; findMany: jest.Mock; findUnique: jest.Mock } },
    tenant: { donation: { count: jest.Mock; aggregate: jest.Mock }, member: { count: jest.Mock }, campaign: { count: jest.Mock } }
  };

  beforeEach(async () => {
    db = {
      base: {
        organization: { create: jest.fn(), findMany: jest.fn(), findUnique: jest.fn() },
      },
      tenant: {
        donation: { count: jest.fn(), aggregate: jest.fn() },
        member: { count: jest.fn() },
        campaign: { count: jest.fn() },
      },
    };
    const mod = await Test.createTestingModule({
      providers: [
        OrganizationsService,
        { provide: DatabaseService, useValue: db },
      ],
    }).compile();
    service = mod.get(OrganizationsService);
  });

  describe('getSummary', () => {
    it('returns correct summary data', async () => {
      db.tenant.donation.count.mockResolvedValue(5);
      db.tenant.donation.aggregate.mockResolvedValue({ _sum: { amount: 1000 } });
      db.tenant.member.count.mockResolvedValue(10);
      db.tenant.campaign.count.mockResolvedValue(2);

      const r = await service.getSummary();
      expect(r).toEqual({
        donationsCount: 5,
        totalAmount: 1000,
        membersCount: 10,
        campaignsCount: 2,
      });
      expect(db.tenant.donation.count).toHaveBeenCalledWith({ where: { status: 'SUCCEEDED' } });
      expect(db.tenant.member.count).toHaveBeenCalledWith({ where: { status: 'ACTIVE' } });
    });

    it('returns 0 for totalAmount if no donations', async () => {
      db.tenant.donation.count.mockResolvedValue(0);
      db.tenant.donation.aggregate.mockResolvedValue({ _sum: { amount: null } });
      db.tenant.member.count.mockResolvedValue(0);
      db.tenant.campaign.count.mockResolvedValue(0);

      const r = await service.getSummary();
      expect(r.totalAmount).toBe(0);
    });
  });
});
