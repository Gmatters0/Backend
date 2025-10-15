import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { Morador } from 'src/morador/entities/morador.entity';
import { Unidade } from 'src/unidade/entities/unidade.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'admin',
      database: 'sistema-condominio',
      entities: [User, Unidade, Morador],
      synchronize: true, // Em desenvolvimento, para produção use migrations
    }),
  ],
})
export class DatabaseModule {}
