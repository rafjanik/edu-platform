import { ApiProperty } from '@nestjs/swagger';
import { Role } from 'src/shared/enums/roles.enum';
import { Column, Entity, PrimaryGeneratedColumn, VersionColumn } from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @ApiProperty({ example: 1, description: 'Identifier' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({ length: 128 })
  name: string;

  @ApiProperty()
  @Column({ unique: true })
  email: string;

  @ApiProperty()
  @Column({ length: 128 })
  password: string;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.User,
  })
  role: Role;

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
