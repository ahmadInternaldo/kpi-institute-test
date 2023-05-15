// roles.guard.ts

import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { ROLES_KEY } from './roles.decorator';
import { RoleEnum } from './role.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<RoleEnum[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredRoles) {
      return true; // No roles specified, allow access
    }

    const { user } = context.switchToHttp().getRequest();

    const validation = requiredRoles.includes(user.profile_name);
    if (!validation) {
      throw new UnauthorizedException();
    }

    return true;
  }
}
