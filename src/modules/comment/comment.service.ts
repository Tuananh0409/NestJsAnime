import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from '../../entities/comment.entity';
import { User } from '../../entities/user.entity';
import { Movie } from '../../entities/movie.entity';
import { CreateCommentDto } from './dto/create-comment.dto';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepo: Repository<Comment>,

    @InjectRepository(User)
    private readonly userRepo: Repository<User>,

    @InjectRepository(Movie)
    private readonly movieRepo: Repository<Movie>,
  ) {}

  async findAll(): Promise<any[]> {
    const comments = await this.commentRepo.find({
      relations: ['user', 'movie'],
    });

    return comments.map((comment) => ({
      id: comment.id,
      content: comment.content,
      created_at: comment.created_at,
      user: { id: comment.user.id },
      movie: { id: comment.movie.id },
    }));
  }
  
  async create(data: CreateCommentDto, userId: number): Promise<any> {
    const user = await this.userRepo.findOne({ where: { id: userId  } });
    const movie = await this.movieRepo.findOne({ where: { id: data.movie_id } });

    if (!user) throw new NotFoundException('User not found');
    if (!movie) throw new NotFoundException('Movie not found');

    const comment = this.commentRepo.create({
      content: data.content,
      created_at: new Date(),
      user,
      movie,
    });

    const saved = await this.commentRepo.save(comment);

    return {
      id: saved.id,
      content: saved.content,
      created_at: saved.created_at,
      user: { id: user.id, username: user.username },
      movie: { id: movie.id, title: movie.title },
    };
  }

  async delete(id: number): Promise<void> {
    await this.commentRepo.delete(id);
  }
}
