import { ForbiddenException, Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { SigninDto, SignupDto, TokenDto } from './dto';
import { hash, verify } from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private db: DbService,
    private jwt: JwtService,
    private config: ConfigService,
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

    return await this.signTokenAsync(user.id, user.email);
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

    return await this.signTokenAsync(user.id, user.email);
  }

  private async signTokenAsync(
    userId: number,
    email: string,
  ): Promise<TokenDto> {
    const payload = {
      sub: userId,
      email: email,
    };

    const expiresIn = this.config.get('JWT_EXPIRES_IN');

    const options = {
      expiresIn: expiresIn,
      secret: this.config.get('JWT_SECRET'),
    };

    const token = await this.jwt.signAsync(payload, options);

    return {
      access_token: token,
      expires_in: +expiresIn,
      user_id: userId,
    };
  }
}
