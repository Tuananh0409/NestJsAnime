import { IsInt, IsNotEmpty, IsOptional } from "class-validator";

export class CreateViewDto {
  @IsInt()
  @IsNotEmpty()
  user_id: number;

  @IsInt()
  @IsNotEmpty()
  movie_id: number;

  @IsInt()
  @IsOptional() // vì có thể có phim không có tập (movie lẻ)
  episode_id?: number;
}