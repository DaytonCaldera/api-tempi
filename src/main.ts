import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: process.env.FRONTEND_SITE, // Specify your allowed origin
    credentials: true,
  });
  app.use(cookieParser());
  await app.listen(process.env.APP_PORT);
}
bootstrap();
