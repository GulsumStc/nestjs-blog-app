import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() { // this funtion bootstraps the application
  const app = await NestFactory.create(AppModule);
  // adds global validation pipe so you avoid repetative code. nest js will automatically validate incoming requests if  controller method will have a dto class associated with it
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // removes properties that are not in the dto
    forbidNonWhitelisted: true, // forbids non whitelisted properties and throws an error
    transform: true,// it transform the request to an instance of the dto class after validation
  }));


  /* Swagger configuration */

  const config = new DocumentBuilder()
    .setTitle('Blog App API')
    .setDescription('Use the base api url http://localhost:8000')
    .setTermsOfService('http://localhost:8000/terms-of-service')
    .setLicense('MIT License', 'https://github.com/git/git-scm.com/blob/main/MIT-LICENSE.txt')
    .addServer('http://localhost:8000', 'localhost')
    .setVersion('1.0')
    .build();
  // instantiate document
  const document = SwaggerModule.createDocument(app, config);
  //use domument to complate setup
  SwaggerModule.setup('api', app, document);



  await app.listen(8000);
}
bootstrap();
