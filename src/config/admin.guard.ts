import { CanActivate, ExecutionContext, Injectable, ForbiddenException } from '@nestjs/common';

@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user) {
      throw new ForbiddenException('인증된 사용자가 아닙니다.');
    }

    if (user.role !== 'admin') {
      throw new ForbiddenException('관리자만 접근할 수 있습니다.');
    }

    return true;
  }
}
