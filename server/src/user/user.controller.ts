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
}
