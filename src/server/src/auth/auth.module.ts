import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guard';
import { JwtSigner, JwtStrategy } from './provider';

@Module({
  imports: [JwtModule.register({}), PassportModule],
  exports: [JwtAuthGuard],
  controllers: [AuthController],
  providers: [AuthService, JwtAuthGuard, JwtStrategy, JwtSigner],
})
export class AuthModule {}
