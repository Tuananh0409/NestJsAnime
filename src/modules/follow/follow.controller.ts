import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { FollowService } from './follow.service';
import { CreateFollowDto } from './dto/create-follow.dto';

@Controller('follow')
export class FollowController {
  constructor(private readonly followService: FollowService) {}

  @Post()
  create(@Body() dto: CreateFollowDto){
    return this.followService.followMovie(dto)
  }

  @Delete()
  unfollow(@Body() dto: CreateFollowDto){
    return this.followService.unFollowMovie(dto)
  }
  
  @Get(':idUser')
  getFollowByUser(@Param('idUser') idUser: number){
    return this.followService.getFollowByUser(idUser);
  }
  
  
  
}
