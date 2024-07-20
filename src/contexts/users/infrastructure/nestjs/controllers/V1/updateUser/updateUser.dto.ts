import { PickType } from '@nestjs/swagger';
import { UserCreateControllerDto } from '../createUser/createUser.dto';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class UserUpdateControllerDto extends PickType(UserCreateControllerDto, [
  'name',
  'address',
  'phone',
  'country',
  'city',
  'birthdate',
]) {
  @IsUUID()
  @IsNotEmpty()
  @IsString()
  id: string;
}
