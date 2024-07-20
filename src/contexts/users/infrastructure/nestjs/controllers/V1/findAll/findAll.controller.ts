import { Controller } from '@nestjs/common';
import { V1_ROUTES } from '../../routes';
import { UserFindAllUseCase } from 'src/contexts/users/application/userFindAll/userFindAll';
import { PrimitiveUser } from 'src/contexts/users/domain/entities/Users';
import { MessagePattern } from '@nestjs/microservices';

@Controller(V1_ROUTES.BASE)
export class UserFindAllController {
  constructor(private readonly userFindAllUseCase: UserFindAllUseCase) {}

  @MessagePattern('findAllUsers')
  async run(): Promise<Partial<PrimitiveUser>[]> {
    return await this.userFindAllUseCase.run();
  }
}
