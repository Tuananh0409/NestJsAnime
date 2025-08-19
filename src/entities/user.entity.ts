import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Comment } from './comment.entity';
import { View } from './view.entity';
import { Follow } from './follows.entity';
import { CommentBlog } from './commentblog.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  username: string;

  @Column({ length: 512 })
  password: string;

  @Column({ length: 512, unique: true })
  email: string;

  @Column({ length: 10, default: 'user' })
  role: string;

  @Column()
  avatar: string;

  @OneToMany(() => Comment, (comment) => comment.user)
  comments: Comment[];

  @OneToMany(() => View, (view) => view.user)
  views: View[];
  
  @OneToMany(() => CommentBlog, (commentBlog) => commentBlog.user)
  comment: CommentBlog[];

  @OneToMany(() => Follow, (follow) => follow.user)
  follows: Follow[];

  @Column({ nullable: true })
  hashedRefreshToken?: string;

}
