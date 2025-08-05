import { IsNotEmpty, IsNumber, IsString, isString } from "class-validator";

export class CreateCommentDto {
    @IsNumber()
    user_id: number

    @IsNumber()
    movie_id: number

    @IsString()
    @IsNotEmpty()
    content: string
}