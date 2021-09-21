import {
  Controller,
  Headers,
  Post,
  Body,
  ValidationPipe,
  Get,
  Delete,
  Query,
} from '@nestjs/common';
import { MeService } from './me.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ResType } from 'src/common/response-type';
import { GetUser } from 'src/common/decorator';
import { User } from 'src/entities/user.entity';

@Controller()
export class MeController {
  constructor(private readonly meService: MeService) {}
  @Post('signup')
  async signUp(
    @Body(ValidationPipe) createUserDto: CreateUserDto,
  ): Promise<any> {
    return this.meService.signUp(createUserDto);
  }

  @Get('me')
  async getMyInfo(@GetUser() user: User): Promise<ResType> {
    return this.meService.getMyInfo(user);
  }

  @Delete('me')
  async deleteMyInfo(
    @GetUser() user: User,
    @Headers('Authorization') accessToken: string,
    @Query('tokenType') tokenType: string,
  ): Promise<ResType> {
    return this.meService.deleteMyInfo(user, accessToken, tokenType);
  }
}
