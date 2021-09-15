import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MeService } from './me.service';
import { CreateMeDto } from './dto/create-me.dto';
import { UpdateMeDto } from './dto/update-me.dto';

@Controller('me')
export class MeController {
  constructor(private readonly meService: MeService) {}

  @Post()
  create(@Body() createMeDto: CreateMeDto) {
    return this.meService.create(createMeDto);
  }

  @Get()
  findAll() {
    return this.meService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.meService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMeDto: UpdateMeDto) {
    return this.meService.update(+id, updateMeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.meService.remove(+id);
  }
}
