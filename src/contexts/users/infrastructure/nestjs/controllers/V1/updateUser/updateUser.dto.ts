import { PartialType } from '@nestjs/swagger';
import { UserCreateControllerDto } from '../createUser/createUser.dto';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class UserUpdateControllerDto extends PartialType(
  UserCreateControllerDto,
  {
    skipNullProperties: true,
  },
) {
  @IsUUID()
  @IsNotEmpty()
  @IsString()
  id: string;
}
