import { instanceToPlain } from "class-transformer";
import { connectionSource } from "../../../config/ormconfig";
import { Userstatus } from "../../../entities/UserStatus";

class ListUserStatusService {
  async execute() {
    const usersStatusRepositories  = connectionSource.getRepository(Userstatus);

    const usersStatus = await usersStatusRepositories.find();

    return instanceToPlain(usersStatus);
  }
}

export { ListUserStatusService };
