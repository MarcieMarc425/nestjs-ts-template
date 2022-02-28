import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';
import * as os from 'os';
import { LoggerModule } from 'nestjs-pino';
import { AppController } from 'src/app.controller';
import { AppService } from 'src/app.service';
import { IConfig } from 'src/interfaces';

@Module({
  imports: [
    LoggerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService<IConfig, true>) => {
        return {
          pinoHttp: {
            base: {
              hostname: os.hostname(),
              app: 'nestjs-ts-template',
            },
            autoLogging: false,
            level:
              configService.get('LOG_LEVEL', { infer: true }) ||
              configService.get('NODE_ENV', { infer: true }) === 'production'
                ? 'info'
                : 'debug',
            transport:
              configService.get('NODE_ENV', { infer: true }) !== 'production'
                ? { target: 'pino-pretty', options: { translateTime: true } }
                : undefined,
            quietReqLogger: true,
          },
        };
      },
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      validationSchema: Joi.object<IConfig>({
        NODE_ENV: Joi.string()
          .valid('production', 'development')
          .default('production'),
        DEPLOY_ENV: Joi.string()
          .valid('production', 'pre-production', 'uat', 'sit', 'local')
          .default('production'),
        PORT: Joi.number().default(3000),
        LOG_LEVEL: Joi.string(),
        DATABASE_URL: Joi.string().required(),
      }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
