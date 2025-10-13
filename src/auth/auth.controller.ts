/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Controller, Post, UseGuards, Request, Get } from '@nestjs/common';
import { AuthService } from './auth.service';

import { IsPublic } from './decorators/is-public.decorator';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @IsPublic()
  @UseGuards(LocalAuthGuard) // <--- Esta linha é a correção principal!
  @Post('login')
  login(@Request() req) {
    // Graças ao LocalAuthGuard, se o código chegar aqui,
    // o req.user já foi validado e existe.
    return this.authService.login(req.user);
  }

  @Get('profile')
  getProfile(@Request() req) {
    // O JwtAuthGuard já rodou (porque é global) e anexou o usuário
    // decodificado do token em req.user.
    return req.user;
  }
}
