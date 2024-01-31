import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';
import { AppModule } from './app.module';

const env = new ConfigService().getOrThrow('NODE_ENV');
const port = new ConfigService().getOrThrow('PORT');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  if (env === 'development') {
    const builder = new DocumentBuilder()
      .setTitle('Swagger NestJS API')
      .setDescription(
        'The OpenAPI specification is used to describe RESTful APIs.',
      )
      .setVersion('1.0')
      .addTag('NestJS API')
      .addBearerAuth()
      .build();
    const document = SwaggerModule.createDocument(app, builder);
    SwaggerModule.setup('swagger', app, document);
  }

  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
  });

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  app.use(helmet());

  await app.listen(port);
}

bootstrap()
  .then(() => {
    console.log(`Node environment: ${env}`);
    console.log(`Nest application listen on port ${port}.`);
  })
  .catch((err) => {
    console.error(err);
  });
