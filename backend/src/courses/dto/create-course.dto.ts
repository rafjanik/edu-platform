import { IsString, MaxLength } from 'class-validator';

export class CreateCourseDto {
  @IsString()
  @MaxLength(128)
  title: string;

  thumbnail: string;

  @IsString()
  description: string;
}
