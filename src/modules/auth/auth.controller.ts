// src/modules/auth/auth.controller.ts

import { Controller, Post, Body, UseGuards, Get, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { JwtAuthGuard } from './jwt.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() body: RegisterDto) {
    return this.authService.register(body);
  }

  @Post('login')
  login(@Body() body: LoginDto) {
    return this.authService.login(body);
  }

  @Post('refresh')
  refresh(@Body('refresh_token') token: string) {
    return this.authService.refreshToken(token);
  }

  // 👇 Đây là route được bảo vệ
  @UseGuards(JwtAuthGuard)
  @Get('protected')
  getProtected(@Req() req) {
    return {
      message: 'You are authorized!',
      user: req.user,
    };
  }
}
