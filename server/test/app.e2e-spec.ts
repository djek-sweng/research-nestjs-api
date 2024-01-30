import { Test, TestingModule } from '@nestjs/testing';
import {
  HttpCode,
  HttpStatus,
  INestApplication,
  ValidationPipe,
} from '@nestjs/common';
import * as pactum from 'pactum';
import { AppModule } from './../src/app.module';
import { DbService } from './../src/db/db.service';
import { DbManager } from './db';
import { SignupDto } from 'src/auth/dto';
import { inspect } from 'util';

describe('Application (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

    await app.init();
    await app.listen(5001);

    pactum.request.setBaseUrl(await app.getUrl());

    await new DbManager(app.get(DbService)).deleteAll();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('Auth', () => {
    describe('Signup', () => {
      it('Should signup', () => {
        const body: SignupDto = {
          name: 'test',
          email: 'test@test.com',
          password: 'pasSworD',
        };
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody(body)
          .expectStatus(HttpStatus.CREATED)
          .expectBodyContains('access_token')
          .expectBodyContains('expires_in')
          .expectBodyContains('user_id')
          .inspect();
      });
    });

    describe('Signin', () => {
      it.todo('Should signin');
    });
  });

  describe('User', () => {
    describe('Get profile', () => {});
    describe('Get email', () => {});
    describe('Get name', () => {});
    describe('Get status', () => {});
    describe('Update profile', () => {});
  });

  describe('Note', () => {
    describe('Create note', () => {});
    describe('Get notes', () => {});
    describe('Get note by id', () => {});
    describe('Update note', () => {});
    describe('Delete note', () => {});
  });
});
