import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpCode,
  Put,
  UseInterceptors,
  UploadedFile,
  UsePipes,
} from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Course } from './entities/course.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { uploadFileName, storageLocation } from './storage';
import { ThumbnailValidationPipe } from './validations/thumbnail-validation.pipe';

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Get()
  findAll() {
    return this.coursesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Course | null> {
    return this.coursesService.findOne(parseInt(id));
  }

  @Post()
  @UseInterceptors(
    FileInterceptor('thumbnail', {
      storage: diskStorage({
        destination: storageLocation(),
        filename: (req, file, cb) => cb(null, uploadFileName(file)),
      }),
    }),
  )
  @UsePipes(ThumbnailValidationPipe)
  create(
    @UploadedFile() thumbnail: Express.Multer.File,
    @Body() createCourseDto: CreateCourseDto,
  ) {
    if (thumbnail) {
      createCourseDto.thumbnail = thumbnail.filename;
    }

    return this.coursesService.create(createCourseDto);
  }

  @Put(':id')
  @UseInterceptors(
    FileInterceptor('thumbnail', {
      storage: diskStorage({
        destination: storageLocation(),
        filename: (req, file, cb) => cb(null, uploadFileName(file)),
      }),
    }),
  )
  @UsePipes(ThumbnailValidationPipe)
  update(
    @Param('id') id: string,
    @UploadedFile() thumbnail: Express.Multer.File,
    @Body() updateCourseDto: UpdateCourseDto,
  ) {
    if (thumbnail) {
      updateCourseDto.thumbnail = thumbnail.filename;
    }

    return this.coursesService.update(parseInt(id), updateCourseDto);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: string) {
    return this.coursesService.delete(parseInt(id));
  }
}
