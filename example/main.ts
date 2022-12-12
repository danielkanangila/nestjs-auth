import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('v1');

  const options = new DocumentBuilder()
    .setTitle('Auth API')
    .setDescription('The Auth API description')
    .setVersion('1.0')
    .addBearerAuth({
      name: 'Authorization',
      type: 'http',
      scheme: 'Bearer',
      in: 'header',
    })
    .addTag('auth')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-docs', app, document);

  await app.listen(3000);
}
bootstrap();
