import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';

const port = new ConfigService().getOrThrow('PORT');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  await app.listen(port);
}

bootstrap()
  .then(() => {
    console.log(`Nest application listen on port ${port}.`);
  })
  .catch((err) => {
    console.error(err);
  });
