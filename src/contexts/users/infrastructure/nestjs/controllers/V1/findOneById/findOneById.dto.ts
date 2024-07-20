import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class UserFindOneControllerDto {
  @IsUUID()
  @IsNotEmpty()
  @IsString()
  id: string;
}
