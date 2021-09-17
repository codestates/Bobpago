import {
  Controller,
  Headers,
  Post,
  Body,
  ValidationPipe,
  Get,
} from '@nestjs/common';
import { MeService } from './me.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller()
export class MeController {
  constructor(private readonly meService: MeService) {}
  @Post('signup')
  async signUp(
    @Body(ValidationPipe) createUserDto: CreateUserDto,
  ): Promise<string> {
    await this.meService.signUp(createUserDto);
    return Object.assign({
      data: { ...createUserDto },
      statusCode: 201,
      statusMsg: `saved successfully`,
    });
  }
}
