import { UpdateUser, User } from '../../domain/entities/Users';
import { UsersRepository } from '../../domain/repository/users.repository';
import { Injectable } from 'src/utils/dependencyInject/injectable';
import { PrismaClientRepository } from '../prismaClient/prismaClient';
import { ErrorDeleteException } from '../../domain/errors/errorDelete.exception';
import { ErrorUpdateException } from '../../domain/errors/errorUpdate.exception';
import { UserNotFoundEmailorUserException } from '../../domain/errors/not-found.exception';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class UserMicroservice extends UsersRepository {
  constructor(private readonly prismaRepository: PrismaClientRepository) {
    super();
  }

  async save(user: User): Promise<User> {
    const data = {
      name: user.attributes.name,
      email: user.attributes.email,
      username: user.attributes.username || null,
      phone: user.attributes.phone || null,
      country: user.attributes.country || null,
      address: user.attributes.address || null,
      city: user.attributes.city || null,
      birthdate: user.attributes.birthdate || null,
    };
    const result = await this.prismaRepository.user.create({
      data,
    });
    const newUser = new User({ phone: Number(result.phone), ...result });
    return newUser;
  }
  async delete(id: string): Promise<string> {
    const result = await this.prismaRepository.user.findUnique({
      where: {
        id,
      },
    });
    if (!result) throw new RpcException('El usuario no existe');

    const deleted = await this.prismaRepository.user.delete({
      where: {
        id,
      },
    });

    if (!deleted) throw new ErrorDeleteException(id);
    return 'Usuario eliminado con exito';
  }

  async findAll(): Promise<User[]> {
    const result = await this.prismaRepository.user.findMany();

    return result.map(
      (user) => new User({ phone: Number(user.phone), ...user }),
    );
  }

  async findById(id: string): Promise<User> {
    const result = await this.prismaRepository.user.findUnique({
      where: {
        id,
      },
    });
    const user = new User(result);
    return user;
  }

  async update(user: UpdateUser, id: string): Promise<string> {
    const result = await this.prismaRepository.user.update({
      where: {
        id: id,
      },
      data: user.toValue(),
    });
    if (!result) throw new ErrorUpdateException(id);
    return 'Usuario actualizado con exito';
  }

  async getOne(username?: string, email?: string): Promise<User> {
    const where = username ? { username } : { email };
    const result = await this.prismaRepository.user.findFirst({
      where,
    });
    if (!result) {
      throw new UserNotFoundEmailorUserException(email, username);
    }
    const user = new User(result);
    return user;
  }
}
