import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() { // this funtion bootstraps the application
  const app = await NestFactory.create(AppModule);
  await app.listen(8000);
}
bootstrap();
