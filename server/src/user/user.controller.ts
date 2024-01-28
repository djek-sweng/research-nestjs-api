import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './../auth/guard';

@UseGuards(JwtAuthGuard)
@Controller('users')
export class UserController {
  @Get('profile')
  getProfile(@Request() req: any) {
    return req.user;
  }
}
