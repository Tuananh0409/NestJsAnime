import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateEpisodeDto{
    @IsNumber()
    movie_id: number;

    @IsNumber()
    episode_no: number;

    @IsString()
    title: string;

    @IsString()
    @IsNotEmpty()
    video_url: string
}