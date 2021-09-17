import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ValidationPipe,
  Header,
  Query,
  UseGuards,
  Headers,
  Req,
  Res,
} from '@nestjs/common';
import { request, Request, Response } from 'express';
import { AuthService } from './auth.service';
import { CheckAuthDto } from './dto/check-auth.dto';
import { JwtAccessAuthGuard } from './jwt-access/jwt-access.guard';
import { JwtRefreshAuthGuard } from './jwt-refresh/jwt-refresh.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signin')
  signin(
    @Body(ValidationPipe) checkAuthDto: CheckAuthDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<{ accessToken: string }> {
    return this.authService.signIn(checkAuthDto, res);
  }

  @UseGuards(JwtAccessAuthGuard)
  @Post('/signout')
  signout(@Res({ passthrough: true }) res: Response): Promise<string> {
    return this.authService.signOut(res);
  }

  @UseGuards(JwtRefreshAuthGuard)
  @Get('/tokenRequest')
  generateToken(@Req() req: Request): Promise<{ accessToken: string }> {
    return this.authService.newGenerateToken(req);
  }
  // signout(@Headers('Authorization') accessToken: string): Promise<string> {
  //   return this.authService.signOut(accessToken);
  // }

  // @Get()
  // findAll() {
  //   return this.authService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.authService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
  //   return this.authService.update(+id, updateAuthDto);
  // }

  //   @Delete(':id')
  //   remove(@Param('id') id: string) {
  //     return this.authService.remove(+id);
  //   }
}
