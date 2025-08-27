import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
   super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_ACCESS_SECRET || 'default_secret',
    });
  }

  async validate(payload: any) {
  console.log('JWT validate payload:', payload);
  return {
    id: payload.sub,  // đổi thành id
    email: payload.email,
    role: payload.role,
  };
}
}
