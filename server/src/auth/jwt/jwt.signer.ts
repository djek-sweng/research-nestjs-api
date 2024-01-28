import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { TokenDto } from '../dto';
import { JwtPayload, JwtUser } from './jwt.models';

@Injectable()
export class JwtSigner {
  constructor(
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async signTokenAsync(user: JwtUser): Promise<TokenDto> {
    const payload: JwtPayload = {
      sub: user.id,
      email: user.email,
    };

    const expiresIn = parseInt(this.config.get('JWT_EXPIRES_IN'));

    const options = {
      expiresIn: expiresIn,
      secret: this.config.get('JWT_SECRET'),
    };

    const token = await this.jwt.signAsync(payload, options);

    return {
      access_token: token,
      expires_in: expiresIn,
      user_id: user.id,
    };
  }
}
