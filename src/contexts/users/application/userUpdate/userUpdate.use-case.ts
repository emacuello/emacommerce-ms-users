import { Injectable } from 'src/utils/dependencyInject/injectable';
import { UpdateUser } from '../../domain/entities/Users';
import { UsersRepository } from '../../domain/repository/users.repository';
import { UserFindUpdateDto } from './userUpdate.dto';
import { ErrorUpdateException } from '../../domain/errors/errorUpdate.exception';

@Injectable()
export class UserUpdateUseCase {
  constructor(private readonly userRepository: UsersRepository) {}

  async run(dto: UserFindUpdateDto, id: string): Promise<string> {
    const user = UpdateUser.create(dto);
    const result = await this.userRepository.update(user, id);
    if (!result) throw new ErrorUpdateException(id);
    return result;
  }
}
