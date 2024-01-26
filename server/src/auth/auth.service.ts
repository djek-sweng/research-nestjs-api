import { Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';

@Injectable()
export class AuthService {
  constructor(private db: DbService) {}

  signup() {
    return { message: 'I am signed up' };
  }

  signin() {
    return { message: 'I am signed in' };
  }
}
