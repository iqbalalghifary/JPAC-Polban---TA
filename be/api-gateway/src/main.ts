import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import { config } from './app/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.listen(config.PORT);
  Logger.log(
    `🚀 Application is running on: http://localhost:3005`
  );
}

bootstrap();