import { Test } from '@nestjs/testing';
import { DatabaseService } from './database.service';

describe('DatabaseService', () => {
  let service: DatabaseService;

  beforeEach(async () => {
    const mod = await Test.createTestingModule({
      providers: [DatabaseService],
    }).compile();
    service = mod.get(DatabaseService);
  });

  it('should have tenant and base defined', () => {
    expect(service.tenant).toBeDefined();
    expect(service.base).toBeDefined();
  });
});
