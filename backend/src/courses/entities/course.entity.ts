import {
  BeforeInsert,
  Column,
  Entity,
  Generated,
  PrimaryGeneratedColumn,
  VersionColumn,
} from 'typeorm';
import { kebabCase } from 'lodash';

@Entity({ name: 'courses' })
export class Course {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

  @Column()
  title: string;

  @Column({ unique: true })
  slug: string;

  @Column({ nullable: true })
  thumbnail: string;

  @Column({ nullable: true })
  description: string;

  @Column({ unique: true })
  @Generated('increment')
  position: number;

  @Column({ default: new Date() })
  created_at: Date;

  @Column({ default: new Date() })
  updated_at: Date;

  @VersionColumn()
  version!: number;

  @BeforeInsert()
  private beforeInsert(): void {
    this.slug = kebabCase(this.title);
  }
}
