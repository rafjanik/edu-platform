import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  Generated,
  PrimaryGeneratedColumn,
  VersionColumn,
} from 'typeorm';

@Entity({ name: 'courses' })
export class Course {
  @ApiProperty({ example: 1, description: 'Identifier' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  user_id: number;

  @ApiProperty()
  @Column({ length: 128 })
  title: string;

  @ApiProperty()
  @Column({ unique: true })
  slug: string;

  @ApiProperty()
  @Column({ default: null, nullable: true })
  thumbnail: string;

  @ApiProperty()
  @Column({ type: 'text', nullable: true })
  description: string;

  @ApiProperty({
    example: 1,
    description: 'Position of the record in the list',
  })
  @Column({ unique: true })
  @Generated('increment')
  position: number;

  @ApiProperty()
  @Column({ default: new Date() })
  created_at: Date;

  @ApiProperty()
  @Column({ default: new Date() })
  updated_at: Date;

  @ApiProperty({ example: 1, description: 'Record version' })
  @VersionColumn()
  version!: number;
}
