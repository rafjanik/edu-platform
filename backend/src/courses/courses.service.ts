import { Injectable } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { DeleteResult } from 'typeorm';
import { Course } from './entities/course.entity';
import { kebabCase } from 'lodash';
import { CourseRepository } from './courses.repository';

@Injectable()
export class CoursesService {
  constructor(private courseRepository: CourseRepository) {}

  findAll() {
    return this.courseRepository.find();
  }

  findOne(id: number): Promise<Course | null> {
    return this.courseRepository.findOneBy({ id });
  }

  async create(createCourseDto: CreateCourseDto) {
    const attributes = {
      ...createCourseDto,
      user_id: 1, // TODO: id auth user
      slug: await this.generateSlug(createCourseDto.title),
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

  async generateSlug(title: string) {
    const baseSlug = kebabCase(title);
    let customSlug = baseSlug;
    let slugCount = 1;

    while (await this.courseRepository.existingSlug(customSlug)) {
      customSlug = `${baseSlug}-${slugCount++}`;
    }

    return customSlug;
  }
}
