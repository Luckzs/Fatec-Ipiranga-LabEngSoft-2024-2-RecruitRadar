
import { connectionSource } from "../../../config/ormconfig";
import { Userstatus } from "../../../entities/UserStatus";


interface IUserStatusRequest {
  name: string;
}

class CreateUserStatusService {
  async execute({ name }: IUserStatusRequest) {

    const usersStatusRepository = connectionSource.getRepository(Userstatus);

    if (!name) {
      throw new Error("É necessário informar o nome do status");
    }

    const statusAlreadyExists = await usersStatusRepository.findOne(
      { where: { name } },
    );

    if (statusAlreadyExists) {
      throw new Error("Status already exists");
    }

    const userStatus = usersStatusRepository.create({
      name
    });
    await usersStatusRepository.save(userStatus);

    return userStatus;
  }
}
export { CreateUserStatusService };
