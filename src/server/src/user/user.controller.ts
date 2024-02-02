import { Body, Controller, Get, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { JwtAuthGuard } from './../auth/guard';
import { ReqUser } from './../auth/decorator';
import { UpdateUserDto } from './dto';
import { UserService } from './user.service';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

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

  @Put('profile')
  updateUser(@ReqUser('id') userId: number, @Body() dto: UpdateUserDto) {
    return this.userService.updateUser(userId, dto);
  }
}
