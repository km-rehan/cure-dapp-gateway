import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from "@nestjs/common";
import { Transport } from "@nestjs/microservices";
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.connectMicroservice({
    transport: Transport.REDIS,
    options: {
      retryAttempts: 5,
      retryDelay: 1000
    }
  })
  
  app.enableCors({
    origin: [
      "http://localhost:3000"
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true
  })
  app.set('trust_proxy', 1);
  app.useGlobalPipes(new ValidationPipe())
  await app.listen(4200);
}
bootstrap();
