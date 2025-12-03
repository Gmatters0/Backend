import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailService } from './mail.service';
import { MailController } from './mail.controller';
import { Morador } from 'src/morador/entities/morador.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Morador])],
  controllers: [MailController],
  providers: [MailService],
})
export class MailModule {}
