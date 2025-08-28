import { Controller, Post, Body, Get, Param, Put, Delete, ParseIntPipe } from '@nestjs/common';
import { EpisodeService } from './episode.service';
import { CreateEpisodeDto } from './dto/create-repository.dto';

@Controller('episodes')
export class EpisodeController {
  constructor(private readonly episodeService: EpisodeService) {}

  @Post()
  async create(@Body() dto: CreateEpisodeDto) {
    return this.episodeService.create(dto);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: CreateEpisodeDto,
  ) {
    return this.episodeService.update(id, dto);
  }

  @Get()
  async findAll() {
    return this.episodeService.findAll();
  }

  @Get('movie/:movieId')
  async findByMovieId(@Param('movieId', ParseIntPipe) movieId: number) {
    return this.episodeService.findByMovieId(movieId);
  }

  @Delete(':movieId/:episodeNo')
  async removeEpisodeNoByIdMovie(
    @Param('movieId', ParseIntPipe) movieId: number,
    @Param('episodeNo', ParseIntPipe) episodeNo: number,
  ) {
    return this.episodeService.removeEpisodeNoByIdMovie(movieId, episodeNo);
  }
}
