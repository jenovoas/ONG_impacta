import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';
import { PinoLoggerService } from './common/logger/pino-logger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  // Usar logger de Pino
  app.useLogger(app.get(PinoLoggerService));

  const isProd = process.env.NODE_ENV === 'production';

  // Exception filter global
  app.useGlobalFilters(new AllExceptionsFilter());

  app.enableCors({
    origin: isProd
      ? ['https://impacta.pinguinoseguro.cl']
      : ['http://localhost:5173', 'http://localhost:3000'],
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  app.setGlobalPrefix('api');

  // Swagger solo en desarrollo
  if (!isProd) {
    const config = new DocumentBuilder()
      .setTitle('ONG Impacta+ API')
      .setDescription('API para gestión integral de ONGs')
      .setVersion('1.0')
      .addBearerAuth()
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/docs', app, document);
  }

  const port = process.env.PORT ?? 4000;
  await app.listen(port);
  app.get(PinoLoggerService).log(`🚀 API Impacta+ corriendo en puerto ${port}`);
  if (!isProd) {
    app.get(PinoLoggerService).log(`📚 Swagger disponible en http://localhost:${port}/api/docs`);
  }
}
bootstrap();
