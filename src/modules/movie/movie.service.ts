import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Movie } from 'src/entities/movie.entity';
import { Repository } from 'typeorm';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { MovieCategory } from 'src/entities/movie-category.entity';

@Injectable()
export class MovieService {
  constructor(
    @InjectRepository(Movie)
    private readonly movieRepository: Repository<Movie>,

    @InjectRepository(MovieCategory)
    private readonly movieCategoryRepository: Repository<MovieCategory>,
  ) {}


  // lấy ra phim theo thể loại

  async getMoviesByCategorySlug(slug: string, page = 1, limit = 15) {
  const offset = (page - 1) * limit;

  const query = this.movieCategoryRepository
    .createQueryBuilder('mc')
    .leftJoin('mc.category', 'category')
    .innerJoin('mc.movie', 'movie')
    .leftJoin('movie.episodes', 'episode')    .leftJoin('movie.comments', 'comment')
    .leftJoin('movie.views', 'view')
    .where('category.slug = :slug', { slug })
    .select([
      'movie.id AS id',
      'movie.title AS title',
      'movie.img_url AS img_url',
      'COUNT(DISTINCT episode.id) AS episodesCount',
      'COUNT(DISTINCT comment.id) AS commentsCount',
      'COUNT(DISTINCT view.id) AS viewsCount',
    ])
    .groupBy('movie.id')
    .orderBy('movie.id', 'ASC')
    .offset(offset)
    .limit(limit);

  const [movies, totalResult] = await Promise.all([
    query.getRawMany(),
    this.movieCategoryRepository
      .createQueryBuilder('mc')
      .leftJoin('mc.category', 'category')
      .innerJoin('mc.movie', 'movie')
      .where('category.slug = :slug', { slug })
      .select('COUNT(DISTINCT movie.id)', 'count')
      .getRawOne(),
  ]);

  const total = parseInt(totalResult?.count || '0', 10);

  return {
    data: movies,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
}




  
  // Lấy ra phim từ những comment mới nhất
  async getMoviesByNewComment(limit?: number) {
  const movies = await this.movieRepository
    .createQueryBuilder('movie')
    .innerJoin('movie.comments', 'comment') // chỉ lấy phim có comment
    .leftJoin('movie.views', 'view')        // có thể có hoặc không view
    .select([
      'movie.id AS id',
      'movie.title AS title',
      'movie.img_url AS img_url',
      'COUNT(DISTINCT comment.id) AS commentsCount',
      'MAX(comment.created_at) AS lastCommentDate',
      'COUNT(DISTINCT view.id) AS viewsCount',
    ])
    .groupBy('movie.id')
    .orderBy('lastCommentDate', 'DESC')
    .limit(limit ?? 6)
    .getRawMany();

  return movies;
}



  async create(createMovieDto: CreateMovieDto) {
    const { categoryIds, ...movieData } = createMovieDto;

    // B1: Tạo movie trước
    const movie = this.movieRepository.create({
      ...movieData,
      created_at: new Date()
    });
    await this.movieRepository.save(movie);

    // B2: Nếu có categoryIds thì thêm các bản ghi movie_category
    if (categoryIds && categoryIds.length > 0) {
      const movieCategories = categoryIds.map((categoryId) =>
        this.movieCategoryRepository.create({
          movie_id: movie.id,
          category_id: categoryId,
        }),
      );
      await this.movieCategoryRepository.save(movieCategories);
    }

    // B3: Trả về movie kèm quan hệ
    return this.movieRepository.findOne({
      where: { id: movie.id },
      relations: ['movieCategories', 'movieCategories.category'],
    });
  }

  async updateByCategory(id: number, updateMovieDto: UpdateMovieDto) {
    const { categoryIds, ...movieData } = updateMovieDto;

    // 1. Cập nhật thông tin phim
    await this.movieRepository.update(id, movieData);

    // 2. Nếu có categoryIds → xử lý bảng movie_category
    if (categoryIds && categoryIds.length > 0) {
      // Xoá thể loại cũ
      await this.movieCategoryRepository.delete({ movie_id: id });

      // Tạo bản ghi mới
      const movieCategories = categoryIds.map((categoryId) =>
        this.movieCategoryRepository.create({
          movie_id: id,
          category_id: categoryId,
        }),
      );
      await this.movieCategoryRepository.save(movieCategories);
    }

    // 3. Trả về movie đã cập nhật (kèm thể loại)
    return this.movieRepository.findOne({
      where: { id },
      relations: ['movieCategories', 'movieCategories.category'],
    });
  }

  findAll() {
    return this.movieRepository.find({
    relations: ['movieCategories', 'movieCategories.category', 'episodes', 'comments'],
});

  }

  findOne(id: number) {
    return this.movieRepository.findOne({
      where: { id },
      relations: [
        'movieCategories',
        'movieCategories.category',
        'episodes',
        'comments',
      ],
    });
  }

  async update(id: number, data: UpdateMovieDto) {
    await this.movieRepository.update(id, data);
    return this.findOne(id);
  }

  remove(id: number) {
    return this.movieRepository.delete(id);
  }
}
