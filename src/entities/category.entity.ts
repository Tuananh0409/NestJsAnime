import { Entity, PrimaryGeneratedColumn, Column, OneToMany, BeforeInsert, BeforeUpdate } from 'typeorm';
import { MovieCategory } from './movie-category.entity';
import slugify from 'slugify';

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

  @BeforeInsert()
  @BeforeUpdate()
  generateSlug() {
    if (this.name) {
      this.slug = slugify(this.name, {lower: true})
    }
  }
  
}