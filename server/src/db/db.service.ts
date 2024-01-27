import { Injectable } from '@nestjs/common';
import { PrismaClient, User } from '@prisma/client';

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

  findUserByEmail(email: string): Promise<User> {
    return this.user.findFirst({ where: { email: email } });
  }
}
