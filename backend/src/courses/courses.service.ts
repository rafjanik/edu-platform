import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { DeleteResult, Repository } from 'typeorm';
import { Course } from './entities/course.entity';

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(Course) private courseRepository: Repository<Course>,
  ) {}

  findAll() {
    return this.courseRepository.find();
  }

  findOne(id: number): Promise<Course | null> {
    return this.courseRepository.findOneBy({ id });
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
    const course = this.courseRepository.findOneBy({ id });

    return this.courseRepository.save(course);
  }

  async delete(id: number): Promise<DeleteResult> {
    return await this.courseRepository.delete(id);
  }
}
