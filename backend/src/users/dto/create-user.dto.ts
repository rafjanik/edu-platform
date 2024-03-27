import { ApiProperty } from '@nestjs/swagger';
import { Role } from 'src/shared/enums/roles.enum';

export class CreateUserDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  role: Role;
}
