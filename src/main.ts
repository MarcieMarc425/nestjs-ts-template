import { ValidationPipe, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from 'src/app.module';
import { BASE_API_ROUTE, BASE_ROUTE, DEFAULT_API_VERSION } from '@constants';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger } from 'nestjs-pino';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });

  app.useLogger(app.get(Logger));

  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: DEFAULT_API_VERSION,
  });
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.setGlobalPrefix(BASE_ROUTE);
  app.enableCors({ origin: '*' });

  // Swagger documentation
  const configService = app.get(ConfigService);

  if (configService.get('DEPLOY_ENV') !== 'production') {
    const swaggerConfig = new DocumentBuilder()
      .setTitle('NestJS API')
      .setDescription('NestJS API')
      .setVersion(DEFAULT_API_VERSION)
      .build();

    const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);
    SwaggerModule.setup(`${BASE_API_ROUTE}/docs`, app, swaggerDocument);
  }

  await app.listen(configService.get('PORT') as number);
}
bootstrap();
