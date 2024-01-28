import { hash, verify } from 'argon2';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { DbService } from './../db/db.service';
import { SigninDto, SignupDto, TokenDto } from './dto';
import { JwtSigner } from './jwt';

@Injectable()
export class AuthService {
  constructor(
    private db: DbService,
    private jwt: JwtSigner,
  ) {}

  async signup(dto: SignupDto): Promise<TokenDto> {
    const email = dto.email.toLowerCase();

    let user = await this.db.findUserByEmail(email);

    if (user) {
      throw new ForbiddenException('Email already signed up.');
    }

    const passwordHash = await hash(dto.password);

    user = await this.db.user.create({
      data: { email: email, passwordHash: passwordHash, name: dto.name },
    });

    return await this.jwt.signTokenAsync(user.id, user.email);
  }

  async signin(dto: SigninDto): Promise<TokenDto> {
    const email = dto.email.toLowerCase();

    const user = await this.db.findUserByEmail(email);

    if (!user) {
      throw new ForbiddenException('Invalid email or password.');
    }

    const isValid = await verify(user.passwordHash, dto.password);

    if (!isValid) {
      throw new ForbiddenException('Invalid email or password.');
    }

    return await this.jwt.signTokenAsync(user.id, user.email);
  }
}
