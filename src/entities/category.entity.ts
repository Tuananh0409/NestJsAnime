import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { MovieCategory } from './movie-category.entity';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  name: string;

  @Column({ length: 50, unique: true })
  slug: string

  @OneToMany(() => MovieCategory, mc => mc.category)
  movieCategories: MovieCategory[];
}