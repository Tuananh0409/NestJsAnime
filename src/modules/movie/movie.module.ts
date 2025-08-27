import { Module } from '@nestjs/common';
import { MovieService } from './movie.service';
import { MovieController } from './movie.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movie } from 'src/entities/movie.entity';
import { MovieCategory } from 'src/entities/movie-category.entity';
import { Follow } from 'src/entities/follows.entity';

@Module({
  controllers: [MovieController],
  providers: [MovieService],
  imports: [TypeOrmModule.forFeature([Movie]), TypeOrmModule.forFeature([MovieCategory]), TypeOrmModule.forFeature([Follow])]
})
export class MovieModule {}
