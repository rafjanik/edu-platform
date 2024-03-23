import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { DeleteResult } from 'typeorm';
import { Course } from './entities/course.entity';
import { kebabCase } from 'lodash';
import { CourseRepository } from './courses.repository';

@Injectable()
export class CoursesService {
  constructor(private courseRepository: CourseRepository) {}

  async findAll() {
    return await this.courseRepository.find({
      order: {
        position: 'ASC',
      },
    });
  }

  async findOne(id: number): Promise<Course | null> {
    const course = await this.courseRepository.findOneBy({ id });
    if (!course) {
      throw new NotFoundException('Course not found');
    }

    return course;
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

  async update(id: number, updateCourseDto: UpdateCourseDto) {
    const course = await this.courseRepository.findOneBy({ id });
    if (!course) {
      throw new NotFoundException('Course not found');
    }

    const attributes = {
      id: id,
      ...updateCourseDto,
      updated_at: new Date(),
    };

    return this.courseRepository.save(attributes);
  }

  async updateThumbnail(id: number, thumbnail?: string) {
    const course = await this.courseRepository.findOneBy({ id });
    if (!course) {
      throw new NotFoundException('Course not found');
    }

    const attributes = {
      ...course,
      thumbnail,
      updated_at: new Date(),
    };

    return this.courseRepository.save(attributes);
  }

  async delete(id: number): Promise<DeleteResult> {
    const course = await this.courseRepository.findOneBy({ id });
    if (!course) {
      throw new NotFoundException('Course not found');
    }

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
