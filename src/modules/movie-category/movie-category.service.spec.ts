import { Test, TestingModule } from '@nestjs/testing';
import { MovieCategoryService } from './movie-category.service';

describe('MovieCategoryService', () => {
  let service: MovieCategoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MovieCategoryService],
    }).compile();

    service = module.get<MovieCategoryService>(MovieCategoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
