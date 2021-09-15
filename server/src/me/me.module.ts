import { Module } from '@nestjs/common';
import { MeService } from './me.service';
import { MeController } from './me.controller';

@Module({
  controllers: [MeController],
  providers: [MeService],
})
export class MeModule {}
