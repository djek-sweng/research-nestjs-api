import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class DbService extends PrismaClient {
  constructor() {
    super({
      datasources: {
        db: {
          url: 'postgresql://root:pasSworD@localhost:5432/nestjs-api?schema=public',
        },
      },
    });
  }
}
