import { ForbiddenException, Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { SigninDto, SignupDto } from './dto';
import { hash, verify } from 'argon2';

@Injectable()
export class AuthService {
  constructor(private db: DbService) {}

  async signup(dto: SignupDto) {
    let user = await this.db.findUserByEmail(dto.email);

    if (user) {
      throw new ForbiddenException('Email already signed up.');
    }

    const passwordHash = await hash(dto.password);

    user = await this.db.user.create({
      data: { email: dto.email, passwordHash: passwordHash, name: dto.name },
    });

    delete user.passwordHash;

    return user;
  }

  async signin(dto: SigninDto) {
    const user = await this.db.findUserByEmail(dto.email);

    if (!user) {
      throw new ForbiddenException('Invalid email or password.');
    }

    const isValid = await verify(user.passwordHash, dto.password);

    if (!isValid) {
      throw new ForbiddenException('Invalid email or password.');
    }

    delete user.passwordHash;

    return user;
  }
}
