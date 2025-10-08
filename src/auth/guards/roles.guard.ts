/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()]
    );

    // Se a rota não exige nenhum perfil específico, permite o acesso.
    if (!requiredRoles) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();

    // **AQUI ESTÁ A CORREÇÃO CRUCIAL**
    // Se não existir um usuário na requisição, não há como checar o perfil.
    // Isso acontece em rotas públicas.
    if (!user) {
      return false;
    }

    // Continua com a lógica original se o usuário existir.
    return requiredRoles.some((role) => user.role?.includes(role));
  }
}
