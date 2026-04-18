import { Test } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { DatabaseService } from '../database/database.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

describe('AuthService', () => {
  let service: AuthService;
  let db: { base: { user: { findFirst: jest.Mock } } };
  let jwt: { sign: jest.Mock; verify: jest.Mock };

  beforeEach(async () => {
    db = { base: { user: { findFirst: jest.fn() } } };
    jwt = { sign: jest.fn().mockReturnValue('signed-token'), verify: jest.fn() };
    const mod = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: DatabaseService, useValue: db },
        { provide: JwtService, useValue: jwt },
      ],
    }).compile();
    service = mod.get(AuthService);
  });

  describe('validateUser', () => {
    it('returns user sin passwordHash cuando credenciales válidas', async () => {
      const hash = await bcrypt.hash('demo', 10);
      db.base.user.findFirst.mockResolvedValue({
        id: 'u1', email: 'a@b.cl', passwordHash: hash, organizationId: 'o1', role: 'ADMIN',
        organization: { id: 'o1', name: 'X', slug: 'demo', plan: 'FREE' },
      });
      const r = await service.validateUser('a@b.cl', 'demo', 'demo');
      expect(r).toBeDefined();
      expect(r?.passwordHash).toBeUndefined();
      expect(r?.email).toBe('a@b.cl');
    });
    it('retorna null si password inválido', async () => {
      db.base.user.findFirst.mockResolvedValue({
        id: 'u1', passwordHash: await bcrypt.hash('otra', 10),
      });
      expect(await service.validateUser('a@b.cl', 'demo', 'demo')).toBeNull();
    });
    it('retorna null si user no existe', async () => {
      db.base.user.findFirst.mockResolvedValue(null);
      expect(await service.validateUser('x@x.cl', 'demo', 'demo')).toBeNull();
    });
  });

  describe('login', () => {
    it('retorna shape completo con organization', async () => {
      const r = await service.login({
        id: 'u1', email: 'a@b.cl', organizationId: 'o1', role: 'ADMIN',
        organization: { id: 'o1', name: 'X', slug: 'demo', plan: 'FREE' },
      });
      expect(r.access_token).toBe('signed-token');
      expect(r.user.organization).toEqual({ id: 'o1', name: 'X', slug: 'demo', plan: 'FREE' });
      expect(jwt.sign).toHaveBeenCalledWith({ sub: 'u1', email: 'a@b.cl', orgId: 'o1', role: 'ADMIN' });
    });
  });
});
