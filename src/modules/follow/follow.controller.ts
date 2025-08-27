import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { FollowService } from './follow.service';
import { CreateFollowDto } from './dto/create-follow.dto';

@Controller('follow')
export class FollowController {
  constructor(private readonly followService: FollowService) {}

  
  @Get(':idUser')
  getFollowByUser(@Param('idUser') idUser: number){
    return this.followService.getFollowByUser(idUser);
  }

  @Post('toggle')
  async toggleFollow(@Body() createFollowDto: CreateFollowDto) {
    return this.followService.toggleFollowMovie(createFollowDto);
  }

  
}
