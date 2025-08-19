import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { CommentBlog } from './commentblog.entity';

@Entity()
export class Blog {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ unique: true })
  slug: string;

  @Column()
  image_url: string;

  @Column({ type: 'text' })
  content: string;

  @Column({ type: 'date' })
  date: Date;

  @Column()
  category: string;

  @OneToMany(() => CommentBlog, commentBlog => commentBlog.blog)
  comments: CommentBlog[];
}