import { ApiProperty } from '@nestjs/swagger';
import { IsEmpty } from 'class-validator';

export class ThumbnailFileUploadDto {
  @ApiProperty({ type: 'string', format: 'binary', required: false })
  thumbnail?: any;
}
