import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import * as pactum from 'pactum';
import { DbManager } from './db';
import { AppModule } from './../src/app.module';
import { DbService } from './../src/db/db.service';
import { SignupDto } from './../src/auth/dto';
import { UpdateUserDto } from './../src/user/dto';
import { CreateNoteDto, UpdateNoteDto } from './../src/note/dto';

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
      confirmPassword: 'pasSworD',
    };

    describe('Signup', () => {
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

      it('should throw if confirm password is empty', () => {
        const body = { ...signupDto };
        body.confirmPassword = '';

        return pactum
          .spec()
          .post('/auth/signup')
          .withBody(body)
          .expectStatus(HttpStatus.BAD_REQUEST)
          .expectBodyContains('confirmPassword should not be empty');
        //.inspect();
      });

      it('should throw if confirm password fails', () => {
        const body = { ...signupDto };
        body.confirmPassword = body.password + '123';

        return pactum
          .spec()
          .post('/auth/signup')
          .withBody(body)
          .expectStatus(HttpStatus.FORBIDDEN)
          .expectBodyContains('Password confirmation failed.');
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
          .patch('/users')
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
          .patch('/users')
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
    let createNoteDto: CreateNoteDto;

    describe('Get empty notes', () => {
      it('should get notes (empty array)', () => {
        return pactum
          .spec()
          .get('/notes')
          .withHeaders(headers)
          .expectStatus(HttpStatus.OK)
          .expectBody([]);
        //.inspect();
      });

      it('should throw unauthorized (w/o headers)', () => {
        return pactum
          .spec()
          .get('/notes')
          .withHeaders({})
          .expectStatus(HttpStatus.UNAUTHORIZED)
          .expectBodyContains('message')
          .expectBodyContains('statusCode')
          .expectBodyContains(HttpStatus.UNAUTHORIZED);
        //.inspect();
      });
    });

    describe('Create note', () => {
      createNoteDto = {
        title: 'test title',
        content: 'test content',
        tag: 'test tag',
      };

      it('should create note', () => {
        return pactum
          .spec()
          .post('/notes')
          .withHeaders(headers)
          .withBody(createNoteDto)
          .expectStatus(HttpStatus.CREATED)
          .expectBodyContains('id')
          .expectBodyContains('title')
          .expectBodyContains('content')
          .expectBodyContains('tag')
          .expectBodyContains(createNoteDto.title)
          .expectBodyContains(createNoteDto.content)
          .expectBodyContains(createNoteDto.tag)
          .stores('noteId', 'id');
        //.inspect();
      });
    });

    describe('Get notes', () => {
      it('should get notes (array with one note)', () => {
        return pactum
          .spec()
          .get('/notes')
          .withHeaders(headers)
          .expectStatus(HttpStatus.OK)
          .expectJsonLength(1)
          .expectBodyContains(createNoteDto.title)
          .expectBodyContains(createNoteDto.content)
          .expectBodyContains(createNoteDto.tag);
        //.inspect();
      });
    });

    describe('Get note', () => {
      it('should get note by id', () => {
        return pactum
          .spec()
          .get('/notes/{id}')
          .withPathParams('id', '$S{noteId}')
          .withHeaders(headers)
          .expectStatus(HttpStatus.OK)
          .expectBodyContains(createNoteDto.title)
          .expectBodyContains(createNoteDto.content)
          .expectBodyContains(createNoteDto.tag);
        //.inspect();
      });

      it('should throw if note is not found', () => {
        return pactum
          .spec()
          .get('/notes/0')
          .withHeaders(headers)
          .expectStatus(HttpStatus.NOT_FOUND)
          .expectBodyContains('message')
          .expectBodyContains('statusCode')
          .expectBodyContains(HttpStatus.NOT_FOUND);
        //.inspect();
      });
    });

    describe('Update note', () => {
      const updateNoteDto: UpdateNoteDto = {
        title: 'updated test title',
        content: 'updated test content',
        tag: 'updated test content',
      };

      it('should update note by id', () => {
        return pactum
          .spec()
          .put('/notes/{id}')
          .withPathParams('id', '$S{noteId}')
          .withHeaders(headers)
          .withBody(updateNoteDto)
          .expectStatus(HttpStatus.OK)
          .expectBodyContains('id')
          .expectBodyContains('title')
          .expectBodyContains('content')
          .expectBodyContains('tag')
          .expectBodyContains(updateNoteDto.title)
          .expectBodyContains(updateNoteDto.content)
          .expectBodyContains(updateNoteDto.tag);
        //.inspect();
      });

      it('should throw if note is not found', () => {
        return pactum
          .spec()
          .put('/notes/0')
          .withHeaders(headers)
          .withBody(updateNoteDto)
          .expectStatus(HttpStatus.NOT_FOUND)
          .expectBodyContains('message')
          .expectBodyContains('statusCode')
          .expectBodyContains(HttpStatus.NOT_FOUND);
        //.inspect();
      });
    });

    describe('Delete note', () => {
      it('should delete note by id', () => {
        return pactum
          .spec()
          .delete('/notes/{id}')
          .withPathParams('id', '$S{noteId}')
          .withHeaders(headers)
          .expectStatus(HttpStatus.NO_CONTENT)
          .expectBody(null);
        //.inspect();
      });

      it('should throw if note is not found', () => {
        return pactum
          .spec()
          .delete('/notes/0')
          .withHeaders(headers)
          .expectStatus(HttpStatus.NOT_FOUND)
          .expectBodyContains('message')
          .expectBodyContains('statusCode')
          .expectBodyContains(HttpStatus.NOT_FOUND);
        //.inspect();
      });
    });

    describe('Get empty notes', () => {
      it('should get notes (empty array)', () => {
        return pactum
          .spec()
          .get('/notes')
          .withHeaders(headers)
          .expectStatus(HttpStatus.OK)
          .expectBody([]);
        //.inspect();
      });
    });
  });
});
