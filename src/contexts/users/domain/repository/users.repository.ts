import { UpdateUser, User } from '../entities/Users';

export abstract class UsersRepository {
  abstract save(user: User): Promise<User>;
  abstract findById(email: string): Promise<User>;
  abstract findAll(): Promise<User[]>;
  abstract update(user: UpdateUser, id: string): Promise<string>;
  abstract delete(id: string): Promise<string>;
  abstract getOne(username?: string, email?: string): Promise<User>;
}
