import { DataSource, Repository } from 'typeorm';
import { Course } from './entities/course.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CourseRepository extends Repository<Course> {
  constructor(private dataSource: DataSource) {
    super(Course, dataSource.createEntityManager());
  }

  async existingSlug(slug: string) {
    return await this.findOne({ where: { slug: slug } });
  }
}
