import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';

@Controller('comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Get()
  async findAll() {
    return this.commentService.findAll();
  }

  @Post()
  async create(@Body() body: CreateCommentDto) {
    return this.commentService.create(body);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.commentService.delete(Number(id));
  }
}
