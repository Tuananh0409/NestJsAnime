import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Comment } from './comment.entity';
import { View } from './view.entity';
import { Follow } from './follows.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  username: string;

  @Column({ length: 512 })
  password: string;

  @Column({ length: 512 })
  email: string;

  @Column({ length: 10, default: 'user' })
  role: string;

  @Column()
  avatar: string;

  @OneToMany(() => Comment, (comment) => comment.user)
  comments: Comment[];

  @OneToMany(() => View, (view) => view.user)
  views: View[];

  @OneToMany(() => Follow, (follow) => follow.user)
  follows: Follow[];
}
