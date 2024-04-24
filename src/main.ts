import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: "*",  
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: "Content-Type, Accept, Authorization",
    credentials: true, // Important if your application involves user sessions or tokens
    optionsSuccessStatus: 204
  });
  const server = app.getHttpServer();
  server.setTimeout(300000); // Set timeout to 5 minutes
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    forbidNonWhitelisted: true, //this will remove any additional properties that are not in the DTO
    whitelist: true, //this will remove any properties that are not in the DTO
  }));// 👈 the global validation pipe is used to validate all the incoming requests
  await app.listen(5000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
