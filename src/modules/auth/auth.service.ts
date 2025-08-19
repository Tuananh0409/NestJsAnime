import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { User } from 'src/entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async register(dto: User) {
    const hash = await bcrypt.hash(dto.password, 10);
    return this.userService.create({ ...dto, password: hash, role: 'user' });
  }

  async login(dto: User) {
    const user = await this.userService.findByEmail(dto.email);
    if (!user || !(await bcrypt.compare(dto.password, user.password))) {
      throw new UnauthorizedException('Email hoặc mật khẩu không đúng');
    }

    const payload = { sub: user.id, email: user.email, role: user.role };

    const accessToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_ACCESS_SECRET,
      expiresIn: '15m',
    });

    const refreshToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_REFRESH_SECRET,
      expiresIn: '7d',
    });

    // lưu refreshToken hash vào DB (tùy bạn dùng bcrypt hoặc lưu plain trong dev)
    const hashedRefresh = await bcrypt.hash(refreshToken, 10);
    await this.userService.update(user.id, { hashedRefreshToken: hashedRefresh });

    return { accessToken, refreshToken, user };
  }

  async refreshToken(token: string): Promise<any> {
    try {
      const payload = this.jwtService.verify(token, {
        secret: process.env.JWT_REFRESH_SECRET,
      });

      const user = await this.userService.findById(payload.sub);
      if (!user || !user.hashedRefreshToken) {
        throw new UnauthorizedException('Refresh token không tồn tại');
      }

      const isMatch = await bcrypt.compare(token, user.hashedRefreshToken);
      if (!isMatch) {
        throw new UnauthorizedException('Refresh token không hợp lệ');
      }

      const newAccessToken = this.jwtService.sign(
        { sub: user.id, email: user.email, role: user.role },
        { secret: process.env.JWT_ACCESS_SECRET, expiresIn: '15m' },
      );

      return { accessToken: newAccessToken };
    } catch (err) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }
  async getAllUsers() {
  return this.userService.findAll(); // Gọi qua UserService
}

}
