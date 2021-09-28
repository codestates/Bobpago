import {
  Controller,
  Headers,
  Post,
  Body,
  ValidationPipe,
  Get,
  Delete,
  Query,
  HttpCode,
  Patch,
  Param,
} from '@nestjs/common';
import { MeService } from './me.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ResType } from 'src/common/response-type';
import { GetUser } from 'src/common/decorator';
import { User } from 'src/entities/user.entity';
import { UpdateUserDto } from './dto/update-me.dto';

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

  @Patch('me')
  async updateMyAccount(
    @GetUser() user: User,
    @Body(ValidationPipe) updateUserDto: UpdateUserDto,
  ): Promise<ResType> {
    return this.meService.updateMyAccount(user, updateUserDto);
  }

  @Delete('me')
  async deleteMyAccount(
    @GetUser() user: User,
    @Headers('Authorization') accessToken: string,
    @Query('tokenType') tokenType: string,
  ): Promise<ResType> {
    return this.meService.deleteMyAccount(user, accessToken, tokenType);
  }

  @Post('restore')
  @HttpCode(200)
  async restoreMyAccount(@Body('email') email: string): Promise<ResType> {
    return this.meService.restoreMyAccount(email);
  }

  @Post('checkMyInfo')
  @HttpCode(200)
  async checkMyInfo(
    @GetUser() user: User,
    @Body('password') password: string,
  ): Promise<ResType> {
    return this.meService.checkMyInfo(user, password);
  }

  @Post(':recipeId/bookmarks')
  async addBookmark(
    @Param('recipeId') recipeId,
    @GetUser() user: User,
  ): Promise<ResType> {
    return this.meService.addBookmark(recipeId, user);
  }

  @Delete(':recipeId/bookmarks')
  async deleteBookmark(@Param('recipeId') recipeId: string): Promise<ResType> {
    return this.meService.deleteBookamark(recipeId);
  }
}
