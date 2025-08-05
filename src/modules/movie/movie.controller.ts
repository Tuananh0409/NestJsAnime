import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { MovieService } from './movie.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';

@Controller('movie')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Post()
  create(@Body() dto: CreateMovieDto) {
    return this.movieService.create(dto);
  }

  // @Post('movieCategory')
  // createByCategory(@Body() dto: CreateMovieDto) {
  //   return this.movieService.createByCategory(dto);
  // }
  @Get()
  findAll() {
    return this.movieService.findAll();
  }

  // @Get(':id')
  // findOne(@Param('id') id: number) {
  //   return this.movieService.findOne(id);
  // }



  
  @Get('new-comment')
  getMoviesByNewComment(
    @Query('limit') limit?: number
  ) {
    return  this.movieService.getMoviesByNewComment(limit ? +limit : undefined)
  }

  @Get('category/:slug')
  getMoviesByCategory(
  @Param('slug') slug: string,
  @Query('page') page: string,
  @Query('limit') limit: string,
) {
  const pageNum = parseInt(page) || 1;
  const limitNum = parseInt(limit) || 15;
  return this.movieService.getMoviesByCategorySlug(slug, pageNum, limitNum);
}



  @Put(':id')
  update(@Param('id') id: number, @Body() dto: UpdateMovieDto) {
    return this.movieService.update(id, dto);
  }

  @Put('updatecategory/:id')
  updateByCategory(@Param('id') id: number, @Body() dto: UpdateMovieDto) {
    return this.movieService.updateByCategory(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.movieService.remove(id);
  }
}
