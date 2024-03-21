import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';

@Injectable()
export class ThumbnailValidationPipe implements PipeTransform {
  readonly maxFileSize: number = 5 * 1024 * 1024;

  transform(value: Express.Multer.File, metadata: ArgumentMetadata) {
    if (metadata.type === 'body' || metadata.type === 'param') {
      return value;
    }

    if (!value) {
      return value;
    }

    if (value.size > this.maxFileSize) {
      throw new BadRequestException('Plik jest za duży');
    }

    if (!value.mimetype.includes('image/')) {
      throw new BadRequestException('Akceptowalne są tylko obrazy.');
    }

    return value;
  }
}
