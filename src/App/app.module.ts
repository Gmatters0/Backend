import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from '../database/database.module';
import { UserModule } from '../user/user.module';
import { AuthModule } from '../auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { UnidadeModule } from 'src/unidade/unidade.module';
import { MoradorModule } from 'src/morador/morador.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Torna as variáveis de ambiente disponíveis em toda a aplicação
    }),
    DatabaseModule,
    UserModule,
    AuthModule,
    UnidadeModule,
    MoradorModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
