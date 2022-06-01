import { PickType } from '@nestjs/swagger';
import { CreateUserReqDto } from 'src/modules/me/dto/request-dto/create-user.req.dto';

export class CheckSignInReqDto extends PickType(CreateUserReqDto, [
  'email',
  'password',
] as const) {}
