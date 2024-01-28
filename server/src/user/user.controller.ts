import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt';

@UseGuards(JwtAuthGuard)
@Controller('users')
export class UserController {
  @Get('me')
  getMe() {
    return { message: 'Hello. It is me.' };
  }

  @Get('profile')
  getProfile(@Request() req: any) {
    return req.user;
  }
}
