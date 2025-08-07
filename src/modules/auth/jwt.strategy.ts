import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'your_jwt_secret_key', // nên lấy từ process.env.JWT_SECRET
    });
  }

  async validate(payload: any) {
    // Đây là user trả về trong req.user
    return {
      userId: payload.sub,
      username: payload.username,
      role: payload.role,
    };
  }
}
