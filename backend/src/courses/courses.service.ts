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
    const attributes = {
      ...createCourseDto,
      user_id: 1, // TODO: id auth user
      created_at: new Date(),
      updated_at: new Date(),
    };
    const course = Object.assign(new Course(), attributes);

    return this.courseRepository.save(course);
  }

  update(id: number, updateCourseDto: UpdateCourseDto) {
    const course = {
      id: id,
      ...updateCourseDto,
      updated_at: new Date(),
    };

    return this.courseRepository.save(course);
  }

  async delete(id: number): Promise<DeleteResult> {
    return await this.courseRepository.delete(id);
  }
}
