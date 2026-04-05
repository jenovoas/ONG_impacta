import { LoggerService, Injectable } from '@nestjs/common';
import pino, { Logger } from 'pino';

@Injectable()
export class PinoLoggerService implements LoggerService {
  private logger: Logger;

  constructor() {
    const isProd = process.env.NODE_ENV === 'production';

    this.logger = pino({
      level: isProd ? 'info' : 'debug',
      transport: isProd
        ? undefined
        : {
            target: 'pino-pretty',
            options: {
              colorize: true,
              translateTime: 'SYS:standard',
              ignore: 'pid,hostname',
            },
          },
    });
  }

  log(message: string, ...optionalParams: any[]) {
    this.logger.info({ context: optionalParams[0] }, message);
  }

  error(message: string, ...optionalParams: any[]) {
    this.logger.error({ context: optionalParams[0], trace: optionalParams[1] }, message);
  }

  warn(message: string, ...optionalParams: any[]) {
    this.logger.warn({ context: optionalParams[0] }, message);
  }

  debug(message: string, ...optionalParams: any[]) {
    this.logger.debug({ context: optionalParams[0] }, message);
  }

  verbose(message: string, ...optionalParams: any[]) {
    this.logger.trace({ context: optionalParams[0] }, message);
  }
}
