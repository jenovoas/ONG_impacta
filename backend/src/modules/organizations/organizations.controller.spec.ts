import { Test } from '@nestjs/testing';
import { OrganizationsController } from './organizations.controller';
import { OrganizationsService } from './organizations.service';

describe('OrganizationsController', () => {
  let controller: OrganizationsController;
  let service: { getSummary: jest.Mock; findOne: jest.Mock; create: jest.Mock; findAll: jest.Mock };

  beforeEach(async () => {
    service = {
      getSummary: jest.fn(),
      findOne: jest.fn(),
      create: jest.fn(),
      findAll: jest.fn(),
    };
    const mod = await Test.createTestingModule({
      controllers: [OrganizationsController],
      providers: [{ provide: OrganizationsService, useValue: service }],
    }).compile();
    controller = mod.get(OrganizationsController);
  });

  it('getSummary calls service.getSummary', async () => {
    service.getSummary.mockResolvedValue({ donationsCount: 1 });
    expect(await controller.getSummary()).toEqual({ donationsCount: 1 });
  });
});
