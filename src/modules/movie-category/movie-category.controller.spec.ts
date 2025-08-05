import { Test, TestingModule } from '@nestjs/testing';
import { MovieCategoryController } from './movie-category.controller';
import { MovieCategoryService } from './movie-category.service';

describe('MovieCategoryController', () => {
  let controller: MovieCategoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MovieCategoryController],
      providers: [MovieCategoryService],
    }).compile();

    controller = module.get<MovieCategoryController>(MovieCategoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
