import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Repository } from 'typeorm';
import { Course } from './entities/course.entity';

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(Course) private courseRepository: Repository<Course>,
  ) {}

  findAll() {
    return this.courseRepository.find();
  }

  findOne(id: number) {
    return this.courseRepository.findOneOrFail(id);
  }

  create(createCourseDto: CreateCourseDto) {
    const course = {
      ...createCourseDto,
      slug: createCourseDto.title.toLowerCase(),
      createdAt: new Date(),
    };
    return this.courseRepository.save(course);
  }

  update(id: number, updateCourseDto: UpdateCourseDto) {
    return `This action updates a #${id} course`;
  }

  async remove(id: number) {
    const course = await this.courseRepository.findOne(id);
    this.courseRepository.remove(course);
  }
}
