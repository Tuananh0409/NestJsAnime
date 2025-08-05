import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity';
import { Movie } from './movie.entity';

@Entity('follows')
export class Follow {
  @PrimaryColumn()
  user_id: number;

  @PrimaryColumn()
  movie_id: number;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  followed_at: Date;

  @ManyToOne(() => User, (user) => user.follows, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Movie, (movie) => movie.follows, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'movie_id' })
  movie: Movie;
}
