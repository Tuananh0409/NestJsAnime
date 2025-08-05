import { Entity, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Movie } from './movie.entity';
import { Category } from './category.entity';

@Entity('movie_category')
export class MovieCategory {
  @PrimaryColumn({name: 'movie_id'})
  movie_id: number;

  @PrimaryColumn({name: 'category_id'})
  category_id: number;

  @ManyToOne(() => Movie, (movie) => movie.movieCategories, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'movie_id' })
  movie: Movie;

  @ManyToOne(() => Category, (category) => category.movieCategories, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'category_id' })
  category: Category;
}
