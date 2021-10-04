import { ApiProperty, PickType } from '@nestjs/swagger';
import { CreateUserReqDto } from './create-user.req.dto';

export class CheckInfoUserReqDto extends PickType(CreateUserReqDto, [
  'password',
] as const) {}
