import { Module } from '@nestjs/common';
import { MoradorService } from './morador.service';
import { MoradorController } from './morador.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Morador } from './entities/morador.entity';
import { UserModule } from 'src/user/user.module';
import { UnidadeModule } from 'src/unidade/unidade.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Morador]),
    UserModule, // Importamos para ter acesso ao UserService
    UnidadeModule, // Importamos para ter acesso ao UnidadeService
  ],
  controllers: [MoradorController],
  providers: [MoradorService],
})
export class MoradorModule {}
