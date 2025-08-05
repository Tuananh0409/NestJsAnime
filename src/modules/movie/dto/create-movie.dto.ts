import { IsArray, IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateMovieDto {
  @IsString() @IsNotEmpty() title: string;
  @IsString() @IsNotEmpty() description: string;
  @IsDateString() @IsNotEmpty() release_date: Date;
  @IsString() @IsNotEmpty() type: string;
  @IsString() @IsNotEmpty() status: string;
  @IsString() @IsNotEmpty() studio: string;
  @IsNumber() @IsNotEmpty() rating: number;
  @IsString() @IsNotEmpty() img_url: string;
  @IsString() @IsNotEmpty() duration: string;
  @IsString() @IsNotEmpty() quality: string;

  @IsOptional()
  @IsArray()
  categoryIds?: number[];
}