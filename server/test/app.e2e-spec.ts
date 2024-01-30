import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { AppModule } from './../src/app.module';
import cleaner from './db.cleaner';

describe('Application (e2e)', () => {
  // it('/ (GET)', () => {
  //   return request(app.getHttpServer())
  //     .get('/')
  //     .expect(200)
  //     .expect('Hello World!');
  // });

  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

    await app.init();

    await cleaner();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('Auth', () => {
    describe('Signup', () => {
      it.todo('Should signup');
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
