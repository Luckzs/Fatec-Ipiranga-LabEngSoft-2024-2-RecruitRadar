import { instanceToPlain } from "class-transformer";
import { connectionSource } from "../../config/ormconfig";
import { User } from "../../entities/User";

class ListUserService {
  async execute() {
    const usersRepositories  = connectionSource.getRepository(User);

    const users = await usersRepositories.find({relations: ["Userstatus"]});

    return instanceToPlain(users);
  }
}

export { ListUserService };
