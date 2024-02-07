import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  if (process.env.APP_DEBUG) {
    app.enableCors();
  }
  app.use(cookieParser());
  await app.listen(process.env.APP_PORT);
}
bootstrap();
