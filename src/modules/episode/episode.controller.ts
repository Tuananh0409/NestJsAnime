import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { EpisodeService } from './episode.service';
import { CreateEpisodeDto } from './dto/create-repository.dto';

@Controller('episode')
export class EpisodeController {
  constructor(private readonly episodeService: EpisodeService) {}

  @Post()
  create(@Body() dto: CreateEpisodeDto) {
    return this.episodeService.create(dto);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() data: CreateEpisodeDto) {
    return this.episodeService.update(1, data);
  }

  @Get()
  findAll() {
    return this.episodeService.findAll();
  }

  @Get(':movieId')
  findByMovieId(@Param('movieId') movieId: number) {
    return this.episodeService.findByMovieId(movieId);
  }


  @Delete(':movieId/:episodeNO')
  delete(
    @Param('movieId') movieId: number,
    @Param('episodeNO') episodeNo: number,
  ) {
    return this.episodeService.removeEpisodeNoByIdMovie(movieId, episodeNo);
  }
}
