import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as helmet from 'helmet';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  app.useGlobalPipes(new ValidationPipe());

  app.use(helmet());
  app.enableCors();

  setupSwagger(app);
  await app.listen(3000, '0.0.0.0');
}

function setupSwagger(app: INestApplication) {
  const options = new DocumentBuilder()
      .setTitle('JavaScript Full-Stack Demo')
      .setDescription('The API description')
      .setVersion('1.0')
      .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('swagger', app, document);
}

bootstrap();
