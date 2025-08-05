import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ViewService } from './view.service';
import { CreateViewDto } from './dto/create-view.dto';

@Controller('view')
export class ViewController {
  constructor(private readonly viewService: ViewService) {}
  
  @Post()
  create(@Body() dto: CreateViewDto){
    return this.viewService.create(dto)
  }

  @Get('movie/:id')
  getViewCount(@Param('id') id:number){
    return this.viewService.findByMovie(id);
  }

  @Get()
  findAll() {
    return this.viewService.findAll()
  }
}
