import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() { // this funtion bootstraps the application
  const app = await NestFactory.create(AppModule);
  // adds global validation pipe so you avoid repetative code. nest js will automatically validate incoming requests if  controller method will have a dto class associated with it
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // removes properties that are not in the dto
    forbidNonWhitelisted: true, // forbids non whitelisted properties and throws an error
    transform: true,// it transform the request to an instance of the dto class after validation
  }));
  await app.listen(8000);
}
bootstrap();
