import {
  Column,
  Entity,
  Generated,
  PrimaryGeneratedColumn,
  VersionColumn,
} from 'typeorm';

@Entity({ name: 'courses' })
export class Course {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

  @Column({ length: 128 })
  title: string;

  @Column({ unique: true })
  slug: string;

  @Column({ default: null, nullable: true })
  thumbnail: string;

  @Column({ type: 'text', nullable: true })
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
}
