import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'courses' })
export class Course {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ unique: true })
  slug: string;

  @Column({ default: new Date() })
  createdAt: Date;
}
