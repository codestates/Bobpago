import {
  Controller,
  Headers,
  Post,
  Body,
  ValidationPipe,
  Get,
} from '@nestjs/common';
import { MeService } from './me.service';
import { CreateUserDto } from '../users/dto/create-user.dto';

@Controller()
export class MeController {
  constructor(private readonly meService: MeService) {}
  @Post('signup')
  signUp(@Body(ValidationPipe) createUserDto: CreateUserDto): Promise<void> {
    return this.meService.signUp(createUserDto);
  }
}
