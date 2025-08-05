import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { View } from 'src/entities/view.entity';
import { Repository } from 'typeorm';
import { CreateViewDto } from './dto/create-view.dto';

@Injectable()
export class ViewService {
    constructor(
        @InjectRepository(View)
        private readonly viewRepository: Repository<View>,
    ){}

    async create(createViewDto: CreateViewDto){
        
        const view = this.viewRepository.create({
            user: {id: createViewDto.user_id},
            movie: {id: createViewDto.movie_id},
            viewed_at: new Date()
        })
        return this.viewRepository.save(view)
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
