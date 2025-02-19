import { Controller } from '@nestjs/common';
import { UserUpdateUseCase } from 'src/contexts/users/application/userUpdate/userUpdate.use-case';
import { V1_ROUTES } from '../../routes';
import { UserUpdateControllerDto } from './updateUser.dto';
import { ErrorUpdateException } from 'src/contexts/users/domain/errors/errorUpdate.exception';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';

@Controller(V1_ROUTES.BASE)
export class UserUpdateController {
  constructor(private readonly userUpdateUseCase: UserUpdateUseCase) {}

  @MessagePattern('updateUser')
  async run(@Payload() data: UserUpdateControllerDto): Promise<string> {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, confirmPassword, id, ...rest } = data;
      return await this.userUpdateUseCase.run(rest, id);
    } catch (error) {
      if (error instanceof ErrorUpdateException) {
        throw new RpcException(error.message);
      }
    }
  }
}
