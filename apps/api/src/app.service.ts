import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHealth() {
    return {
      status: 'ok',
      service: 'impacta-api',
      timestamp: new Date().toISOString(),
    };
  }
}
