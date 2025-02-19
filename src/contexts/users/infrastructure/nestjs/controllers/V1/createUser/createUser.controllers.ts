import { Controller } from '@nestjs/common';
import { V1_ROUTES } from '../../routes';
import { UserCreateUseCase } from 'src/contexts/users/application/LEGACYuserCreate/userCreate.use-case';
import { UserCreateControllerDto } from './createUser.dto';
import { PrimitiveUser } from 'src/contexts/users/domain/entities/Users';
import { ErrorCreateException } from 'src/contexts/users/domain/errors/errorCreate.exception';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';

@Controller(V1_ROUTES.BASE)
export class UserCreateController {
  constructor(private userCreateUseCase: UserCreateUseCase) {}

  @MessagePattern('createUser')
  async run(
    @Payload() userDto: UserCreateControllerDto,
  ): Promise<Partial<PrimitiveUser>> {
    try {
      const user = await this.userCreateUseCase.run(userDto);
      return user;
    } catch (error) {
      if (error instanceof ErrorCreateException) {
        throw new RpcException(error.message);
      }
    }
  }
}
