import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { AppController } from 'src/app.controller';
import { AppService } from 'src/app.service';
import { IConfig } from 'src/interfaces';

@Module({
  imports: [
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
        DATABASE_URL: Joi.string().required(),
      }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
