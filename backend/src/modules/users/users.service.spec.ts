import { Test } from '@nestjs/testing';
import { UsersService } from './users.service';
import { DatabaseService } from '../../database/database.service';
import * as bcrypt from 'bcrypt';

describe('UsersService', () => {
  let service: UsersService;
  let db: { tenant: { user: { findMany: jest.Mock; findFirst: jest.Mock; create: jest.Mock; update: jest.Mock; delete: jest.Mock } } };

  beforeEach(async () => {
    db = {
      tenant: {
        user: {
          findMany: jest.fn(),
          findFirst: jest.fn(),
          create: jest.fn(),
          update: jest.fn(),
          delete: jest.fn(),
        },
      },
    };
    const mod = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: DatabaseService, useValue: db },
      ],
    }).compile();
    service = mod.get(UsersService);
  });

  describe('create', () => {
    it('hashes password before creating user', async () => {
      const data = { email: 'test@cl.cl', password: 'plain', role: 'ADMIN' };
      db.tenant.user.create.mockResolvedValue({ id: '1', email: data.email, role: 'ADMIN' });

      await service.create(data);

      expect(db.tenant.user.create).toHaveBeenCalledWith(expect.objectContaining({
        data: expect.objectContaining({
          email: data.email,
          passwordHash: expect.any(String),
        }),
      }));
      
      const hash = db.tenant.user.create.mock.calls[0][0].data.passwordHash;
      expect(await bcrypt.compare('plain', hash)).toBe(true);
    });
  });

  describe('findAll', () => {
    it('returns users without passwordHash', async () => {
      db.tenant.user.findMany.mockResolvedValue([{ id: '1', email: 'a@b.cl' }]);
      const r = await service.findAll();
      expect(r[0]).not.toHaveProperty('passwordHash');
    });
  });
});
