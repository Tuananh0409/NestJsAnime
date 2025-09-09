import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req, UseGuards } from '@nestjs/common';
import { MovieService } from './movie.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { OptionalJwtAuthGuard } from '../auth/optional-jwt-auth.guard';

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
  // @Get()
  // findAll() {
  //   return this.movieService.findAll();
  // }


  @Get('top-views')
  async getTopViewsDemo(
    @Query('period') period: 'day' | 'week' | 'month' | 'year'
  ) {
    return this.movieService.findMovieByTopView(period);
  }

  @UseGuards(OptionalJwtAuthGuard)
  @Get('movie-detail/:slug')
  async getMovieBySlug(
    @Param('slug') slug: string,
    @Req() req: any
  ) {
    const userId = req.user?.id || null; // có thể null nếu chưa login
    return await this.movieService.findMovieDetailBySlug(slug, userId);
  }


  @Get('watching/:slug')
  async getMovieWatchingData(@Param('slug') slug: string) {
    return await this.movieService.findMovieWatchingData(slug);
  }

  
  @Get('new-comment')
  getMoviesByNewComment(
    @Query('limit') limit?: number
  ) {
    return  this.movieService.getMoviesByNewComment(limit ? +limit : undefined)
  }

    // GET movies 
  @Get() async getAll() { return this.movieService.getAllMoviesWithEpisodesCount(); }
 // GET /movies/:id 


  @Get('recently-added-shows')
  getRecentlyAdded(
    @Query('page') page?: string,
    @Query('limit') limit?: string
  ) {
    return this.movieService.getRecentlyAddedShows(
      page ? parseInt(page, 10) : 1,
      limit ? parseInt(limit, 10) : undefined
    );
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

  @Get('search')
  async searchMovies(
    @Query('q') keyword: string,
    @Query('page') page = 1,
    @Query('limit') limit = 10,
  ) {
    return this.movieService.searchMovies(keyword, Number(page), Number(limit));
  }

  @Get('banner')
  async moviesBanner() {
    return this.movieService.getMoviesBanner()
  }
  
  @Get('generate-slugs')
  generateSlugs() {
    return this.movieService.updateAllSlugs();
  }


  @Get('list-episode/:id') async getOne(@Param('id') id: number) { return this.movieService.getMovieWithEpisodes(id); }

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
