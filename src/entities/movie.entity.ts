import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToMany,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';
import { Episode } from './episode.entity';
import { Comment } from './comment.entity';
import { View } from './view.entity';
import { MovieCategory } from './movie-category.entity';
import { Follow } from './follows.entity';
import slugify from 'slugify';

@Entity()
export class Movie {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 125 })
  title: string;

  @Column('text')
  description: string;

  @Column()
  release_date: Date;

  @Column({ length: 50 })
  type: string;

  @Column({ length: 50 })
  status: string;

  @Column({ length: 100 })
  studio: string;

  @Column('float', { default: 0 })
  rating: number;


  @Column({ length: 500 })
  img_url: string;

  @Column({ length: 50 })
  duration: string;

  @Column({ length: 50 })
  quality: string;

  @Column ()
  created_at: Date;

  @Column()
  updated_at: Date;

  @Column()
  slug: string;

  @Column()
  score: string;

  @Column()
  original_title: string;

  @OneToMany(() => Episode, (episode) => episode.movie)
  episodes: Episode[];

  @OneToMany(() => Comment, (comment) => comment.movie)
  comments: Comment[];

  @OneToMany(() => View, (view) => view.movie)
  views: View[];

  @OneToMany(() => Follow, (follow) => follow.movie)
  follows: Follow[];

  @OneToMany(() => MovieCategory, (mc) => mc.movie)
  movieCategories: MovieCategory[];
  
  @BeforeInsert()
  @BeforeUpdate()
  generateSlug() {
    if (this.title) {
      this.slug = slugify(this.title, {lower: true})
    }
  }
  
}
