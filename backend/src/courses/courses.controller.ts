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
} from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Course } from './entities/course.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { StoreProvider } from './StoreProvider';
import { diskStorage } from 'multer';
import { v4 as uuid } from 'uuid';
import * as mime from 'mime';

@Controller('courses')
export class CoursesController {
  constructor(
    private readonly coursesService: CoursesService,
    private readonly storeProvider: StoreProvider,
  ) {}

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
        destination: '../../storage', // this.storeProvider.storageLocation(),
        filename: (req, file, cb) =>
          cb(null, `${uuid()}.${(mime as any).extensions[file.mimetype]}`),
      }),
    }),
  )
  create(@Body() createCourseDto: CreateCourseDto, @UploadedFile() file) {
    console.log(file);
    return this.coursesService.create(createCourseDto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateCourseDto: UpdateCourseDto) {
    return this.coursesService.update(parseInt(id), updateCourseDto);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: string) {
    console.log(id);
    return this.coursesService.delete(parseInt(id));
  }
}
