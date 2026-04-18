import { Test } from '@nestjs/testing';
import { MembersService } from './members.service';
import { DatabaseService } from '../../database/database.service';
import { BadRequestException } from '@nestjs/common';

describe('MembersService', () => {
  let service: MembersService;
  let db: { tenant: { member: { findMany: jest.Mock; count: jest.Mock; findFirst: jest.Mock; create: jest.Mock; updateMany: jest.Mock } } };

  beforeEach(async () => {
    db = {
      tenant: {
        member: {
          findMany: jest.fn(),
          count: jest.fn(),
          findFirst: jest.fn(),
          create: jest.fn(),
          updateMany: jest.fn(),
        },
      },
    };
    const mod = await Test.createTestingModule({
      providers: [
        MembersService,
        { provide: DatabaseService, useValue: db },
      ],
    }).compile();
    service = mod.get(MembersService);
  });

  describe('findAll', () => {
    it('returns paginated items', async () => {
      db.tenant.member.findMany.mockResolvedValue([{ id: '1' }]);
      db.tenant.member.count.mockResolvedValue(1);

      const r = await service.findAll({ status: 'ACTIVE' });
      expect(r.items).toHaveLength(1);
      expect(r.meta.total).toBe(1);
      expect(r.meta.page).toBe(1);
      expect(db.tenant.member.findMany).toHaveBeenCalledWith(expect.objectContaining({
        where: { status: 'ACTIVE' },
        skip: 0,
        take: 20,
      }));
    });
  });

  describe('create', () => {
    it('throws BadRequestException for invalid RUT', async () => {
      await expect(service.create({ rut: 'invalid' })).rejects.toThrow(BadRequestException);
    });

    it('creates member with valid RUT', async () => {
      const data = { rut: '1-9', firstName: 'Juan' };
      db.tenant.member.create.mockResolvedValue({ id: '1', ...data });
      const r = await service.create(data);
      expect(r.id).toBe('1');
    });
  });
});
