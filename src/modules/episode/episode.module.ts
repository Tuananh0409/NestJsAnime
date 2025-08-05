import { Module } from '@nestjs/common';
import { EpisodeService } from './episode.service';
import { EpisodeController } from './episode.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Episode } from 'src/entities/episode.entity';

@Module({
  controllers: [EpisodeController],
  providers: [EpisodeService],
  imports: [TypeOrmModule.forFeature([Episode])]
})
export class EpisodeModule {}
