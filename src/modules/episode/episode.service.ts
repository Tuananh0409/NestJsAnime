import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Episode } from 'src/entities/episode.entity';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from '../category/dto/create-category.dto';
import { CreateEpisodeDto } from './dto/create-repository.dto';
import { Movie } from 'src/entities/movie.entity';
import { NotFoundError } from 'rxjs';

@Injectable()
export class EpisodeService {
   constructor( 
    @InjectRepository(Episode)
   private readonly episodeRepository: Repository<Episode>
){}

    async create(dto: CreateEpisodeDto){
        const episode = this.episodeRepository.create({
            episode_no: dto.episode_no,
            title: dto.title,
            video_url: dto.video_url,
            movie:{id: dto.movie_id} as Movie
        });
        return await this.episodeRepository.save(episode)
    }

    async update(id: number, dto: CreateEpisodeDto){
        await this.episodeRepository.update(id, {
            episode_no: dto.episode_no,
            title: dto.title,
            video_url: dto.video_url,
            movie: { id: dto.movie_id } as Movie,
        });
        return {
            message: "Đã update thành công tập phim có id: " + id
        }
    }

    async findAll(){
        return await this.episodeRepository.findAndCount({
            relations: ['movie'],
        })
    }

    async findByMovieId(movie_id: number){
        return await this.episodeRepository.find({
            where: {movie: {id: movie_id}},
            order: {
                episode_no: 'ASC'
            },
            relations: ['movie']
        })
    }

   

    async removeEpisodeNoByIdMovie(movieId: number, episode_no: number){
        const episode = await this.episodeRepository.findOne({
            where: {
                movie: {id: movieId},
                episode_no: episode_no
            },
            relations: ['movie'],
        });
        if (!episode){
            throw new NotFoundException('Episode not found');
        }

        await this.episodeRepository.delete(episode);
        return {messgae: 'Episode deleted success'}

    }


}
