import {
  Injectable,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class OptionalJwtAuthGuard extends AuthGuard('jwt') {
  handleRequest(err: any, user: any, info: any, context: ExecutionContext) {
    // ❌ Nếu có token nhưng token sai -> ném lỗi
    if (err || info) {
      return null; // thay vì throw new UnauthorizedException();
    }
    // ✅ Nếu không có token -> user = null
    return user || null;
  }
}
