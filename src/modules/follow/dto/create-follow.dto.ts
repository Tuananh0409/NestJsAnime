import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateFollowDto {
  @IsNumber()
  @IsNotEmpty()
  user_id: number;

  @IsNumber()
  @IsNotEmpty()
  movie_id: number;


}