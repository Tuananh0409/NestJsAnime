import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Movie } from './movie.entity';
import { View } from './view.entity';

@Entity()
export class Episode {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  episode_no: number;

  
  @Column({ length: 50, nullable:true })
  title: string;

  @Column({ length: 512 })
  video_url: string;

  @ManyToOne(() => Movie, (movie) => movie.episodes, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'movie_id' })
  movie: Movie;

  @OneToMany(() => View, (view) => view.episode)
  views: View[];
}
