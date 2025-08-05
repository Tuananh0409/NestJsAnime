import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from 'src/entities/comment.entity';
import { Repository } from 'typeorm';
import { CreateCommentDto } from './dto/create-comment.dto';

@Injectable()
export class CommentService {
    constructor(
        @InjectRepository(Comment) private readonly commentRepository: Repository<Comment>
    ){}

    async create(createCommentDto: CreateCommentDto){
        const comment = await this.commentRepository.create({
            user: {id: createCommentDto.user_id},
            movie: {id: createCommentDto.movie_id},
            created_at: new Date(),
            content: createCommentDto.content
        });
        return this.commentRepository.save(comment)
    }

    async findByMovieId(movie_id: number){
        return this.commentRepository.find({
            where:{movie: {id: movie_id}},
            relations: ['user'],
            order: {created_at: 'DESC'}
        })
    }
}
