import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';

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

  findUserById(id: number) {
    return this.user.findUnique({ where: { id: id } });
  }

  findUserByEmail(email: string) {
    return this.user.findUnique({ where: { email: email } });
  }
}
