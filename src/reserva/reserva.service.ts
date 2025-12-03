import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reserva } from './entities/reserva.entity';
import { CreateReservaDto } from './dto/create-reserva.dto';
import { UpdateReservaDto } from './dto/update-reserva.dto';

@Injectable()
export class ReservaService {
  constructor(
    @InjectRepository(Reserva)
    private reservaRepository: Repository<Reserva>
  ) {}

  async create(createReservaDto: CreateReservaDto) {
    const conflitos = await this.reservaRepository
      .createQueryBuilder('reserva')
      .where('reserva.areaComumId = :areaId', {
        areaId: createReservaDto.areaComumId,
      })
      .andWhere('reserva.data = :data', { data: createReservaDto.data })
      .andWhere('(:inicio < reserva.horaFim AND :fim > reserva.horaInicio)', {
        inicio: createReservaDto.horaInicio,
        fim: createReservaDto.horaFim,
      })
      .getCount();

    if (conflitos > 0) {
      throw new BadRequestException('Horário indisponível para esta área.');
    }

    const novaReserva = this.reservaRepository.create({
      data: createReservaDto.data,
      horaInicio: createReservaDto.horaInicio,
      horaFim: createReservaDto.horaFim,
      areaComum: { id: createReservaDto.areaComumId },
      morador: { id: createReservaDto.moradorId },
    });

    return this.reservaRepository.save(novaReserva);
  }

  findAll() {
    return this.reservaRepository.find({
      relations: ['areaComum', 'morador', 'morador.unidade'],
      order: { data: 'DESC', horaInicio: 'ASC' },
    });
  }

  findByDate(data: string) {
    return this.reservaRepository.find({
      where: { data },
      relations: ['areaComum', 'morador', 'morador.unidade'],
      order: { horaInicio: 'ASC' },
    });
  }

  async findOne(id: number) {
    const reserva = await this.reservaRepository.findOne({
      where: { id },
      relations: ['areaComum', 'morador'],
    });
    if (!reserva) throw new NotFoundException(`Reserva #${id} não encontrada`);
    return reserva;
  }

  async update(id: number, updateReservaDto: UpdateReservaDto) {
    const conflitos = await this.reservaRepository
      .createQueryBuilder('reserva')
      .where('reserva.areaComumId = :areaId', {
        areaId: updateReservaDto.areaComumId,
      })
      .andWhere('reserva.data = :data', { data: updateReservaDto.data })
      .andWhere('(:inicio < reserva.horaFim AND :fim > reserva.horaInicio)', {
        inicio: updateReservaDto.horaInicio,
        fim: updateReservaDto.horaFim,
      })
      .getCount();

    if (conflitos > 0) {
      throw new BadRequestException('Horário indisponível para esta área.');
    }

    const reserva = await this.reservaRepository.preload({
      id,
      ...UpdateReservaDto,
    });
    if (!reserva) throw new NotFoundException(`Reserva #${id} não encontrada`);
    return this.reservaRepository.save(reserva);
  }

  async remove(id: number) {
    const result = await this.reservaRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Reserva #${id} não encontrada`);
    }
  }
}
