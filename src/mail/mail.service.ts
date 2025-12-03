/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as nodemailer from 'nodemailer';
import { Morador } from 'src/morador/entities/morador.entity';
import { SendMailDto } from './dto/send-email.dto';

@Injectable()
export class MailService {
  private transporter;

  constructor(
    @InjectRepository(Morador)
    private moradorRepository: Repository<Morador>
  ) {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'gmacs2212@gmail.com',
        pass: 'rjvt tipr dzlz vmvc',
      },
    });
  }

  async sendBroadcast(dto: SendMailDto) {
    try {
      const moradores = await this.moradorRepository.find({
        relations: ['user'],
      });

      const destinatarios = moradores
        .map((m) => m.user?.email)
        .filter((email) => email && email.includes('@'));

      if (destinatarios.length === 0) {
        return { message: 'Nenhum destinatário com e-mail encontrado.' };
      }

      await this.transporter.sendMail({
        from: '"Sistema Condomínio" <no-reply@condominio.com>',
        bcc: destinatarios,
        subject: dto.assunto,
        text: dto.mensagem,
        html: `<p>${dto.mensagem.replace(/\n/g, '<br>')}</p>`,
      });

      return { success: true, totalEnviado: destinatarios.length };
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Erro ao enviar e-mails');
    }
  }
}
