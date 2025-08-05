import { IsInt, IsNotEmpty } from "class-validator";

export class CreateViewDto {
  @IsInt()
  @IsNotEmpty()
  user_id: number;

  @IsInt()
  @IsNotEmpty()
  movie_id: number;
}