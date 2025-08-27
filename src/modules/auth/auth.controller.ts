import { Controller, Post, Body, UseGuards, Get, Req, Put, Param, Delete  } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt.guard';
import { User } from 'src/entities/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() body: User) {
    return this.authService.register(body);
  }

  @Post('login')
  async login(@Body() body: User) {
    return this.authService.login(body);
  }

  @Post('refresh')
  async refresh(@Body('refreshToken') token: string) {
    return this.authService.refreshToken(token);
  }

  @UseGuards(JwtAuthGuard)
  @Get('protected')
  getProtected(@Req() req) {
    return {
      message: 'You are authorized!',
      user: req.user,
    };
  }
  @Get('users')
  async getAllUsers() {
    return this.authService.getAllUsers();
  }
  // ✅ Sửa user
  @Put('users/:id')
  async updateUser(@Param('id') id: string, @Body() updateData: Partial<User>) {
    return this.authService.updateUser(id, updateData);
  }

  // ✅ Xóa user
  @Delete('users/:id')
  async deleteUser(@Param('id') id: string) {
    return this.authService.deleteUser(id);
  }
}
