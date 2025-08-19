import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Blog } from './blog.entity';
import { User } from './user.entity';

@Entity()
export class CommentBlog {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  content: string;

  @Column({ type: 'datetime' })
  date: Date;

  @Column({ default: 0 })
  likes: number;

  @ManyToOne(() => Blog, blog => blog.comments)
  blog: Blog;

  @ManyToOne(() => User, user => user.comments)
  user: User;
}