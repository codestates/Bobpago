import { PartialType } from '@nestjs/mapped-types';
import { CreateMeDto } from './create-me.dto';

export class UpdateMeDto extends PartialType(CreateMeDto) {}
