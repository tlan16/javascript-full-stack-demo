import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import {INestApplication} from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  setupSwagger(app);
  await app.listen(3000);
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
