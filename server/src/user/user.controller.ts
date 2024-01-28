import { Controller, Get, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { JwtAuthGuard } from './../auth/guard';
import { ReqUser } from './../auth/decorator';

@UseGuards(JwtAuthGuard)
@Controller('users')
export class UserController {
  @Get('profile')
  getProfile(@ReqUser() user: User) {
    return user;
  }

  @Get('email')
  getEmail(@ReqUser('email') email: string) {
    return { email };
  }

  @Get('name')
  getName(@ReqUser('name') name: string) {
    return { name };
  }

  @Get('status')
  getStatus(@ReqUser('status') status: string | null) {
    return { status };
  }
}
