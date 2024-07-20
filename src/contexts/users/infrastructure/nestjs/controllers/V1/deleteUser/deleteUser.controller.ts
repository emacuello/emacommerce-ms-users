import { Controller } from '@nestjs/common';
import { V1_ROUTES } from '../../routes';
import { UserDeleteUseCase } from 'src/contexts/users/application/userDelete/userDelete.use-case';
import { ErrorDeleteException } from 'src/contexts/users/domain/errors/errorDelete.exception';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';
import { UserDeleteControllerDto } from './deleteUser.dtos';

@Controller(V1_ROUTES.BASE)
export class UserDeleteController {
  constructor(private readonly userDeleteUseCase: UserDeleteUseCase) {}

  @MessagePattern('deleteUser')
  async run(@Payload() id: UserDeleteControllerDto): Promise<string> {
    try {
      const result = await this.userDeleteUseCase.run(id);
      return result;
    } catch (error) {
      if (error instanceof ErrorDeleteException) {
        throw new RpcException(error.message);
      }
    }
  }
}
