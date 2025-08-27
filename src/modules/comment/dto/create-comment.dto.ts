import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsString, isString } from "class-validator";

export class CreateCommentDto {

    @IsNumber()
    movie_id: number

    @IsString()
    @IsNotEmpty()
    content: string
}