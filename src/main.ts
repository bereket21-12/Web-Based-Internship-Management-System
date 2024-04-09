import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();  //  Enable CORS globally
  const server = app.getHttpServer();
  server.setTimeout(300000); // Set timeout to 5 minutes
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
  }));// 👈 the global validation pipe is used to validate all the incoming requests
  await app.listen(5000);
}
bootstrap();
