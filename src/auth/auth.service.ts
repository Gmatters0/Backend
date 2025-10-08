/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    console.log('\n--- [AuthService] Iniciando validateUser ---');
    console.log(`Tentando validar o usuário com email: ${email}`);

    const user = await this.userService.findByEmail(email);

    if (!user) {
      console.log('!!! ERRO: Usuário não encontrado no banco de dados.');
      console.log('--- [AuthService] Finalizando validateUser ---\n');
      return null;
    }

    console.log('Usuário encontrado no banco. Comparando senhas...');
    console.log(`   - Senha recebida do frontend: ${pass}`);
    console.log(`   - Hash da senha no banco: ${user.password}`);

    const isPasswordMatching = await bcrypt.compare(pass, user.password);

    if (!isPasswordMatching) {
      console.log('!!! ERRO: As senhas não correspondem.');
      console.log('--- [AuthService] Finalizando validateUser ---\n');
      return null;
    }

    console.log('Sucesso! As senhas correspondem.');
    console.log('--- [AuthService] Finalizando validateUser ---\n');

    const { password, ...result } = user;
    return result;
  }

  login(user: any) {
    const payload = { email: user.email, sub: user.id, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
