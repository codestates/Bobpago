import { PickType } from '@nestjs/swagger';
import { CreateUserReqDto } from './create-user.req.dto';

export class RestoreUserReqDto extends PickType(CreateUserReqDto, [
  'email',
] as const) {}
