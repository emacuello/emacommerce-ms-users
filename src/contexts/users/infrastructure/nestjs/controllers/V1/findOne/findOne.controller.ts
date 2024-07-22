import { Controller } from '@nestjs/common';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';
import { V1_ROUTES } from '../../routes';
import { UserFindOneControllerDto } from './findOne.dto';
import { GetOneService } from 'src/contexts/users/application/getOne/getOne.service';
import { UserNotFoundEmailorUserException } from 'src/contexts/users/domain/errors/not-found.exception';

@Controller(V1_ROUTES.BASE)
export class FindOneController {
  constructor(private readonly userGetOneUserCase: GetOneService) {}
  @MessagePattern('getOne')
  findOne(@Payload() data: UserFindOneControllerDto) {
    try {
      return this.userGetOneUserCase.run(data);
    } catch (error) {
      if (error instanceof UserNotFoundEmailorUserException) {
        throw new RpcException(error.message);
      }
    }
  }
}
