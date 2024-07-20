import { Controller } from '@nestjs/common';
import { V1_ROUTES } from '../../routes';
import { UserFindOneByIdUseCase } from 'src/contexts/users/application/userFindOneById/userFindOnebyId.use-case';
import { UserNotFoundException } from 'src/contexts/users/domain/errors/not-found.exception';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';
import { PrimitiveUser } from 'src/contexts/users/domain/entities/Users';

import { UserFindOneControllerDto } from './findOneById.dto';

@Controller(V1_ROUTES.BASE)
export class UserFindbyIdController {
  constructor(private readonly userFindbyIdUseCase: UserFindOneByIdUseCase) {}

  @MessagePattern('findUserById')
  async run(
    @Payload() id: UserFindOneControllerDto,
  ): Promise<Partial<PrimitiveUser>> {
    try {
      const result = await this.userFindbyIdUseCase.run(id);
      return result;
    } catch (error) {
      if (error instanceof UserNotFoundException) {
        throw new RpcException(error.message);
      }
    }
  }
}
