import { Controller } from '@nestjs/common';
import { MovieCategoryService } from './movie-category.service';

@Controller('movie-category')
export class MovieCategoryController {
  constructor(private readonly movieCategoryService: MovieCategoryService) {}
}
