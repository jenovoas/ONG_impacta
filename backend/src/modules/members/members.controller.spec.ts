import { Test } from '@nestjs/testing';
import { MembersController } from './members.controller';
import { MembersService } from './members.service';

describe('MembersController', () => {
  let controller: MembersController;
  let service: { findAll: jest.Mock; findOne: jest.Mock; create: jest.Mock; update: jest.Mock };

  beforeEach(async () => {
    service = {
      findAll: jest.fn(),
      findOne: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
    };
    const mod = await Test.createTestingModule({
      controllers: [MembersController],
      providers: [{ provide: MembersService, useValue: service }],
    }).compile();
    controller = mod.get(MembersController);
  });

  it('findAll passes filters to service', async () => {
    service.findAll.mockResolvedValue({ items: [], meta: {} });
    await controller.findAll('ACTIVE', 1, 20);
    expect(service.findAll).toHaveBeenCalledWith({ status: 'ACTIVE', page: 1, pageSize: 20 });
  });
});
