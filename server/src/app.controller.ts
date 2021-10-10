import { Controller, Get } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AccessBobpagoResDto } from './access-bobpago.dto';

@ApiTags('WELCOME')
@Controller('')
export class AppController {
  @ApiResponse({
    status: 304,
    description: '밥파고 API 접속 성공',
    type: AccessBobpagoResDto,
  })
  @Get()
  home(): AccessBobpagoResDto {
    return {
      statusCode: 304,
      message: '밥파고 API에 오신 걸 환영합니다.',
    };
  }
}
