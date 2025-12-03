import { PartialType } from '@nestjs/mapped-types';
import { CreateAreaComumDto } from './create-area-comum.dto';

export class UpdateAreaComumDto extends PartialType(CreateAreaComumDto) {}
