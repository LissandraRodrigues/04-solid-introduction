import { User } from "../../model/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  user_id: string;
}

class ListAllUsersUseCase {
  constructor(private usersRepository: IUsersRepository) { }

  execute({ user_id }: IRequest): User[] {
    const user = this.usersRepository.findById(user_id);

    if (!user) {
      throw new Error("User don't exist.");
    }

    const userIsAdmin = user.admin;

    if (!userIsAdmin) {
      throw new Error(
        "Sorry, but you don't have autorization for this action."
      );
    }

    const users = this.usersRepository.list();

    return users;
  }
}

export { ListAllUsersUseCase };
