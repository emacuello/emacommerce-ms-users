import { IsOptional, IsString } from 'class-validator';

export class UserFindOneControllerDto {
  @IsOptional()
  @IsString()
  email?: string;
  @IsOptional()
  @IsString()
  username?: string;
}
