import { Module } from '@nestjs/common';
import { ViewService } from './view.service';
import { ViewController } from './view.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { View } from 'src/entities/view.entity';

@Module({
  controllers: [ViewController],
  providers: [ViewService],
  imports: [TypeOrmModule.forFeature([View])]
})
export class ViewModule {}
