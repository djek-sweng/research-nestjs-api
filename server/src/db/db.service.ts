import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient, User } from '@prisma/client';

@Injectable()
export class DbService extends PrismaClient {
  constructor(config: ConfigService) {
    super({
      datasources: {
        db: {
          url: config.get('DATABASE_URL'),
        },
      },
    });
  }

  findUserById(id: number): Promise<User> {
    return this.user.findUnique({ where: { id: id } });
  }

  findUserByEmail(email: string): Promise<User> {
    return this.user.findUnique({ where: { email: email } });
  }
}
