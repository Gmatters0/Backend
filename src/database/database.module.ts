import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { Morador } from 'src/morador/entities/morador.entity';
import { Unidade } from 'src/unidade/entities/unidade.entity';
import { Prestador } from 'src/prestador/entities/prestador.entity';
import { AreaComum } from 'src/area-comum/entities/area-comum.entity';
import { Reserva } from 'src/reserva/entities/reserva.entity';
import { OrdemServico } from 'src/ordem-servico/entities/ordem-servico.entity';
import { Visitante } from 'src/visitante/entities/visitante.entity';
import { Aviso } from 'src/aviso/entities/aviso.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'admin',
      database: 'sistema-condominio',
      entities: [
        User,
        Unidade,
        Morador,
        Prestador,
        AreaComum,
        Reserva,
        OrdemServico,
        Visitante,
        Aviso,
      ],
      synchronize: true, // Em desenvolvimento, para produção use migrations
    }),
  ],
})
export class DatabaseModule {}
