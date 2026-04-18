import { Test } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

describe('AuthController', () => {
  let controller: AuthController;
  let service: { login: jest.Mock; refresh: jest.Mock; validateUser: jest.Mock };

  beforeEach(async () => {
    service = {
      login: jest.fn(),
      refresh: jest.fn(),
      validateUser: jest.fn(),
    };
    const mod = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [{ provide: AuthService, useValue: service }],
    }).compile();
    controller = mod.get(AuthController);
  });

  it('login calls validateUser and then service.login', async () => {
    const user = { id: '1' };
    const loginDto = { email: 'a@b.cl', password: 'pw', orgSlug: 'demo' };
    service.validateUser.mockResolvedValue(user);
    service.login.mockResolvedValue({ access_token: 'tk' });
    
    const r = await controller.login(loginDto);
    
    expect(r).toEqual({ access_token: 'tk' });
    expect(service.validateUser).toHaveBeenCalledWith(loginDto.email, loginDto.password, loginDto.orgSlug);
    expect(service.login).toHaveBeenCalledWith(user);
  });
});
