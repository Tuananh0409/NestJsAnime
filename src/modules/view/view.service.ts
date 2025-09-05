import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { View } from 'src/entities/view.entity';
import { MoreThan, Repository } from 'typeorm';
import { CreateViewDto } from './dto/create-view.dto';

@Injectable()
export class ViewService {
    constructor(
        @InjectRepository(View)
        private readonly viewRepository: Repository<View>,
    ){}

    async create(createViewDto: CreateViewDto) {
  const { user_id, movie_id, episode_id } = createViewDto;

  const thirtyMinutesAgo = new Date(Date.now() - 30 * 60 * 1000);

  const existingView = await this.viewRepository.findOne({
    where: {
      user: { id: user_id },
      movie: { id: movie_id },
      episode: { id: episode_id },
      viewed_at: MoreThan(thirtyMinutesAgo),
    },
  });

  if (existingView) {
    return existingView;
  }

  const view = this.viewRepository.create({
    user: { id: user_id },
    movie: { id: movie_id },
    episode: { id: episode_id },
    viewed_at: new Date(),
  });

  return this.viewRepository.save(view);
}


    
    async findByMovie(movie_id: number){
        return this.viewRepository.count({
            where: {movie: {id: movie_id}}
        })
    }

    async findAll(){
        return this.viewRepository.find({relations: ['movie', 'user']})
    }
}
