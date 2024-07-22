import { User } from '../../domain/entities/Users';
import { UsersRepository } from '../../domain/repository/users.repository';
import { Injectable } from 'src/utils/dependencyInject/injectable';
import { PrismaClientRepository } from '../prismaClient/prismaClient';
import { ErrorDeleteException } from '../../domain/errors/errorDelete.exception';
import { ErrorUpdateException } from '../../domain/errors/errorUpdate.exception';
import { UserNotFoundEmailorUserException } from '../../domain/errors/not-found.exception';

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
    const result = await this.prismaRepository.user.delete({
      where: {
        id,
      },
    });
    if (!result) throw new ErrorDeleteException(id);
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

  async update(user: User): Promise<string> {
    const result = this.prismaRepository.user.update({
      where: {
        id: user.attributes.id,
      },
      data: {
        name: user.attributes.name,
        email: user.attributes.email,
        phone: user.attributes.phone || null,
        country: user.attributes.country || null,
        address: user.attributes.address || null,
        city: user.attributes.city || null,
        birthdate: user.attributes.birthdate || null,
      },
    });
    if (!result) throw new ErrorUpdateException(user.attributes.id);
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
