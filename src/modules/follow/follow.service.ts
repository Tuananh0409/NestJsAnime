import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Follow } from 'src/entities/follows.entity';
import { Repository } from 'typeorm';
import { CreateFollowDto } from './dto/create-follow.dto';

@Injectable()
export class FollowService {
    constructor(
        @InjectRepository(Follow) private readonly followRepository: Repository<Follow>
    ){}

   async toggleFollowMovie(createFollow: CreateFollowDto) {
    const exist = await this.followRepository.findOne({
        where: {
        user_id: createFollow.user_id,
        movie_id: createFollow.movie_id,
        },
    });

    if (exist) {
        // Nếu đã tồn tại => unfollow
        await this.followRepository.delete({
        user_id: createFollow.user_id,
        movie_id: createFollow.movie_id,
        });
        return { message: "Unfollow successfully", status: false };
    } else {
        // Nếu chưa tồn tại => follow
        const follow = this.followRepository.create(createFollow);
        await this.followRepository.save(follow);
        return { message: "Follow successfully", status: true };
    }
    }
    

    async getFollowByUser(idUser: number){
        return this.followRepository.find({
            where:{
                user_id: idUser,
            },
            relations: ['movie']
        })
    }
    
}
