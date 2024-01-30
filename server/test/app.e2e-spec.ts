import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import * as pactum from 'pactum';
import { DbManager } from './db';
import { AppModule } from './../src/app.module';
import { DbService } from './../src/db/db.service';
import { SignupDto } from './../src/auth/dto';
import { UpdateUserDto } from 'src/user/dto';

describe('Application (e2e)', () => {
  let app: INestApplication;
  let headers: { Authorization: string };

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = module.createNestApplication();

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
      it('should signup', () => {
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

      it('should throw if email is empty', () => {
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

      it('should throw if email is invalid', () => {
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

      it('should throw if password is empty', () => {
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

      it('should throw if name is empty', () => {
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
      it('should signin', () => {
        return pactum
          .spec()
          .post('/auth/signin')
          .withBody(signupDto)
          .expectStatus(HttpStatus.OK)
          .expectBodyContains('access_token')
          .expectBodyContains('expires_in')
          .expectBodyContains('user_id')
          .stores('jwt', 'access_token');
        //.inspect();
      });

      it('should throw if email is empty', () => {
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

      it('should throw if email is invalid', () => {
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

      it('should throw if password is empty', () => {
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
    headers = { Authorization: 'Bearer $S{jwt}' };

    describe('Get profile', () => {
      it('should get profile', () => {
        return pactum
          .spec()
          .get('/users/profile')
          .withHeaders(headers)
          .expectStatus(HttpStatus.OK)
          .expectBodyContains('id')
          .expectBodyContains('email')
          .expectBodyContains('name')
          .expectBodyContains('status')
          .expectBodyContains('createdAt')
          .expectBodyContains('updatedAt');
        //.inspect();
      });

      it('should throw unauthorized (w/o headers)', () => {
        return pactum
          .spec()
          .get('/users/profile')
          .withHeaders({})
          .expectStatus(HttpStatus.UNAUTHORIZED)
          .expectBodyContains('message')
          .expectBodyContains('statusCode')
          .expectBodyContains(HttpStatus.UNAUTHORIZED);
        //.inspect();
      });
    });

    describe('Get email', () => {
      it('should get email', () => {
        return pactum
          .spec()
          .get('/users/email')
          .withHeaders(headers)
          .expectStatus(HttpStatus.OK)
          .expectBodyContains('email');
        //inspect();
      });

      it('should throw unauthorized (w/o headers)', () => {
        return pactum
          .spec()
          .get('/users/email')
          .withHeaders({})
          .expectStatus(HttpStatus.UNAUTHORIZED)
          .expectBodyContains('message')
          .expectBodyContains('statusCode')
          .expectBodyContains(HttpStatus.UNAUTHORIZED);
        //.inspect();
      });
    });

    describe('Get name', () => {
      it('should get name', () => {
        return pactum
          .spec()
          .get('/users/name')
          .withHeaders(headers)
          .expectStatus(HttpStatus.OK)
          .expectBodyContains('name');
        //inspect();
      });

      it('should throw unauthorized (w/o headers)', () => {
        return pactum
          .spec()
          .get('/users/name')
          .withHeaders({})
          .expectStatus(HttpStatus.UNAUTHORIZED)
          .expectBodyContains('message')
          .expectBodyContains('statusCode')
          .expectBodyContains(HttpStatus.UNAUTHORIZED);
        //.inspect();
      });
    });

    describe('Get status', () => {
      it('should get status', () => {
        return pactum
          .spec()
          .get('/users/status')
          .withHeaders(headers)
          .expectStatus(HttpStatus.OK)
          .expectBodyContains('status');
        //inspect();
      });

      it('should throw unauthorized (w/o headers)', () => {
        return pactum
          .spec()
          .get('/users/status')
          .withHeaders({})
          .expectStatus(HttpStatus.UNAUTHORIZED)
          .expectBodyContains('message')
          .expectBodyContains('statusCode')
          .expectBodyContains(HttpStatus.UNAUTHORIZED);
        //.inspect();
      });
    });

    describe('Update profile', () => {
      const dto: UpdateUserDto = {
        name: 'tset',
        email: 'tset@tset.com',
        status: 'sutats',
      };

      it('should update profile', () => {
        return pactum
          .spec()
          .put('/users')
          .withHeaders(headers)
          .withBody(dto)
          .expectStatus(HttpStatus.OK)
          .expectBodyContains('id')
          .expectBodyContains('email')
          .expectBodyContains('name')
          .expectBodyContains('status')
          .expectBodyContains('createdAt')
          .expectBodyContains('updatedAt')
          .expectBodyContains(dto.email)
          .expectBodyContains(dto.name)
          .expectBodyContains(dto.status);
        //.inspect();
      });

      it('should throw unauthorized (w/o headers)', () => {
        return pactum
          .spec()
          .put('/users')
          .withHeaders({})
          .withBody(dto)
          .expectStatus(HttpStatus.UNAUTHORIZED)
          .expectBodyContains('message')
          .expectBodyContains('statusCode')
          .expectBodyContains(HttpStatus.UNAUTHORIZED);
        //.inspect();
      });
    });
  });

  describe('Note', () => {
    const headersss = { Authorization: 'Bearer $S{jwt}' };

    describe('Get empty notes', () => {
      it('should get notes', () => {
        return pactum
          .spec()
          .get('/notes')
          .withHeaders(headersss)
          .expectStatus(HttpStatus.OK)
          .inspect();
      });
    });

    describe('Create note', () => {});

    describe('Get notes', () => {});

    describe('Get note', () => {});

    describe('Update note', () => {});

    describe('Delete note', () => {});
  });
});
