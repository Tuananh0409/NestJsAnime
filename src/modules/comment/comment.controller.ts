import { Body, Controller, Delete, Get, Param, Patch, Post, Req, Request, UseGuards } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Controller('comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Get()
  async findAll() {
    return this.commentService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() data: CreateCommentDto, @Req() req) {
    const userId = Number(req.user.id); // lấy user từ token

    return this.commentService.create(
      data,
    userId, // tự gắn user_id vào data gửi xuống service
    );
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: string, @Req() req) {
    const userId = Number(req.user.id); // lấy user từ token
    return this.commentService.delete(Number(id), userId);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateCommentDto: UpdateCommentDto,
    @Request() req
  ) {
    return this.commentService.update(+id, req.user.id, updateCommentDto);
  }
 
}
