import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from '../../entities/comment.entity';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { User } from '../../entities/user.entity';
import { Movie } from '../../entities/movie.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Comment, User, Movie])],
  controllers: [CommentController],
  providers: [CommentService],
})
export class CommentModule {}
