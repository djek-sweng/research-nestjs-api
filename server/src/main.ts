import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import helmet from 'helmet';
import { AppModule } from './app.module';

const port = new ConfigService().getOrThrow('PORT');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

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
    console.log(`Nest application listen on port ${port}.`);
  })
  .catch((err) => {
    console.error(err);
  });
