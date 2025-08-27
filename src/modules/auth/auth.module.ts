// src/auth/auth.module.ts
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';
import { UserModule } from '../user/user.module'; // Giả sử bạn có UsersModule

@Module({
  imports: [
  PassportModule,
  JwtModule.registerAsync({
    useFactory: () => ({
      secret: process.env.JWT_ACCESS_SECRET || 'default_secret',
      signOptions: { expiresIn: '1d' },
    }),
  }),
  UserModule,
],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
