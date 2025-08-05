import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Movie } from './movie.entity';

@Entity()
export class View {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  viewed_at: Date;

  @ManyToOne(() => User, (user) => user.views, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Movie, (movie) => movie.views, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'movie_id' })
  movie: Movie;
}
