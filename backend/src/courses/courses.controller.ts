import {
  Controller,
  Get,
  Post,
  Patch,
  Body,
  Param,
  Delete,
  HttpCode,
  Put,
  UseInterceptors,
  UploadedFile,
  UsePipes,
} from '@nestjs/common';
import {
  ApiTags,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiConsumes,
  getSchemaPath,
} from '@nestjs/swagger';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Course } from './entities/course.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { uploadFileName, storageLocation } from './storage';
import { ThumbnailValidationPipe } from './validations/thumbnail-validation.pipe';
import { ThumbnailFileUploadDto } from './dto/thumbnail-file-upload.dto';

@ApiTags('Courses')
@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @ApiOperation({
    summary: 'List all courses',
  })
  @ApiResponse({
    status: 200,
    description: 'List all courses',
    schema: {
      type: 'array',
      items: { $ref: getSchemaPath(Course) },
    },
  })
  @Get()
  findAll() {
    return this.coursesService.findAll();
  }

  @ApiOperation({
    summary: 'Get course',
  })
  @ApiResponse({
    status: 200,
    description: 'Get course',
    type: Course,
  })
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Course | null> {
    return this.coursesService.findOne(parseInt(id));
  }

  @ApiOperation({
    summary: 'Create course',
  })
  @ApiCreatedResponse({
    description: 'Course created',
    type: Course,
  })
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
  ): Promise<Course> {
    if (thumbnail) {
      createCourseDto.thumbnail = thumbnail.filename;
    }

    return this.coursesService.create(createCourseDto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateCourseDto: UpdateCourseDto) {
    return this.coursesService.update(parseInt(id), updateCourseDto);
  }

  @ApiOperation({
    summary: 'Upload thumbnail',
  })
  @ApiBody({
    description: 'Upload thumbnail',
    type: ThumbnailFileUploadDto,
  })
  @ApiOkResponse({
    description: 'Upload thumbnail',
    type: Course,
  })
  @ApiConsumes('multipart/form-data')
  @Patch(':id/thumbnail')
  @UseInterceptors(
    FileInterceptor('thumbnail', {
      storage: diskStorage({
        destination: storageLocation(),
        filename: (req, file, cb) => cb(null, uploadFileName(file)),
      }),
    }),
  )
  @UsePipes(ThumbnailValidationPipe)
  updateThumbnail(
    @Param('id') id: string,
    @UploadedFile() thumbnail: Express.Multer.File,
  ) {
    return this.coursesService.updateThumbnail(
      parseInt(id),
      thumbnail?.filename ?? null,
    );
  }

  @ApiOperation({
    summary: 'Delete course',
  })
  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: string) {
    return this.coursesService.delete(parseInt(id));
  }
}
