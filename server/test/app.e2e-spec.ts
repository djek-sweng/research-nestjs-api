import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import * as pactum from 'pactum';
import { DbManager } from './db';
import { AppModule } from './../src/app.module';
import { DbService } from './../src/db/db.service';
import { SignupDto } from './../src/auth/dto';

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
    const signupDto: SignupDto = {
      name: 'test',
      email: 'test@test.com',
      password: 'pasSworD',
    };

    describe('Signup', () => {
      it('Should signup', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody(signupDto)
          .expectStatus(HttpStatus.CREATED)
          .expectBodyContains('access_token')
          .expectBodyContains('expires_in')
          .expectBodyContains('user_id');
        //.inspect();
      });

      it('Should throw if email is empty', () => {
        const body = { ...signupDto };
        body.email = '';

        return pactum
          .spec()
          .post('/auth/signup')
          .withBody(body)
          .expectStatus(HttpStatus.BAD_REQUEST)
          .expectBodyContains('email should not be empty')
          .expectBodyContains('email must be an email');
        //.inspect();
      });

      it('Should throw if email is invalid', () => {
        const body = { ...signupDto };
        body.email = '123';

        return pactum
          .spec()
          .post('/auth/signup')
          .withBody(body)
          .expectStatus(HttpStatus.BAD_REQUEST)
          .expectBodyContains('email must be an email');
        //.inspect();
      });

      it('Should throw if password is empty', () => {
        const body = { ...signupDto };
        body.password = '';

        return pactum
          .spec()
          .post('/auth/signup')
          .withBody(body)
          .expectStatus(HttpStatus.BAD_REQUEST)
          .expectBodyContains('password should not be empty');
        //.inspect();
      });

      it('Should throw if name is empty', () => {
        const body = { ...signupDto };
        body.name = '';

        return pactum
          .spec()
          .post('/auth/signup')
          .withBody(body)
          .expectStatus(HttpStatus.BAD_REQUEST)
          .expectBodyContains('name should not be empty');
        //.inspect();
      });
    });

    describe('Signin', () => {
      it('Should signin', () => {
        return pactum
          .spec()
          .post('/auth/signin')
          .withBody(signupDto)
          .expectStatus(HttpStatus.OK)
          .expectBodyContains('access_token')
          .expectBodyContains('expires_in')
          .expectBodyContains('user_id');
        //.inspect();
      });

      it('Should throw if email is empty', () => {
        const body = { ...signupDto };
        body.email = '';

        return pactum
          .spec()
          .post('/auth/signin')
          .withBody(body)
          .expectStatus(HttpStatus.BAD_REQUEST)
          .expectBodyContains('email should not be empty')
          .expectBodyContains('email must be an email');
        //.inspect();
      });

      it('Should throw if email is invalid', () => {
        const body = { ...signupDto };
        body.email = '123';

        return pactum
          .spec()
          .post('/auth/signin')
          .withBody(body)
          .expectStatus(HttpStatus.BAD_REQUEST)
          .expectBodyContains('email must be an email');
        //.inspect();
      });

      it('Should throw if password is empty', () => {
        const body = { ...signupDto };
        body.password = '';

        return pactum
          .spec()
          .post('/auth/signin')
          .withBody(body)
          .expectStatus(HttpStatus.BAD_REQUEST)
          .expectBodyContains('password should not be empty');
        //.inspect();
      });
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
