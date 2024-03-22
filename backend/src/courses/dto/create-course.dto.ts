import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength } from 'class-validator';

export class CreateCourseDto {
  @ApiProperty()
  @IsString()
  @MaxLength(128)
  title: string;

  thumbnail: string;

  @ApiProperty()
  @IsString()
  description: string;
}
