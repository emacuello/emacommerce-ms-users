export class UserNotFoundException extends Error {
  constructor(public readonly id: string) {
    super(`Usuario con el id ${id} no existe`);
  }
}
export class UserNotFoundEmailorUserException extends Error {
  constructor(
    public readonly email?: string,
    public readonly username?: string,
  ) {
    super(`Usuario con el email ${email} o username ${username} no existe`);
  }
}
