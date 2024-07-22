import { Injectable } from 'src/utils/dependencyInject/injectable';
import { PrimitiveUser } from '../../domain/entities/Users';
import { UserNotFoundEmailorUserException } from '../../domain/errors/not-found.exception';
import { UsersRepository } from '../../domain/repository/users.repository';
import { UserFindOneDtos } from './getOne.dto';

@Injectable()
export class GetOneService {
  constructor(private readonly userRepository: UsersRepository) {}

  async run(dto: UserFindOneDtos): Promise<Partial<PrimitiveUser>> {
    const user = await this.userRepository.getOne(dto.username, dto.email);
    if (!user) {
      throw new UserNotFoundEmailorUserException(dto.email, dto.username);
    }

    return user.toValue();
  }
}
