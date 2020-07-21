import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from "@nestjs/common";
import { Transport } from "@nestjs/microservices";
import { NestExpressApplication } from '@nestjs/platform-express';
import * as shrinkRay from "shrink-ray-current";
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

function shouldCompress(req, res) {
  if (req.headers['x-no-compression']) {
    // don't compress responses with this request header
    return false;
  }
 
  // fallback to standard filter function
  return shrinkRay.filter(req, res);
}

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.connectMicroservice({
    transport: Transport.REDIS,
    options: {
      retryAttempts: 5,
      retryDelay: 1000
    }
  })
  app.use(shrinkRay({
    filter: shouldCompress,
    useZopfliForGzip: true,
    brotli: {
      quality: 7,
      mode: 1,
    }
  }))
  app.enableCors({
    origin: [
      "http://localhost:3000"
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true
  })
  app.set('trust_proxy', 1);
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    skipMissingProperties: true,
  }))

  const options = new DocumentBuilder()
    .setTitle('Cure Dapp')
    .setDescription('Cure dapp API description')
    .setVersion('1.0')
    .addTag('cure dapp')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(4200);
}
bootstrap();
