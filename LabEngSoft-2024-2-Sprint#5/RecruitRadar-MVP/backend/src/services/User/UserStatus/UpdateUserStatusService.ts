import { connectionSource } from "../../../config/ormconfig";
import { Userstatus } from "../../../entities/UserStatus";

interface IUserStatusRequest {
  user_status_id: string;
  name: string;
}

class UpdateUserStatusService {
  async execute({ user_status_id, name}: IUserStatusRequest) {

    const usersStatusRepository = connectionSource.getRepository(Userstatus);

    const userStatusAlreadyExists = await usersStatusRepository.findOne({
      where: {
        user_status_id,
      },
    });

    if (!userStatusAlreadyExists) {
      throw new Error("User not exists")
    }
    
    userStatusAlreadyExists.name = name ? name : userStatusAlreadyExists.name;
    userStatusAlreadyExists.updated_at = new Date()

    return await usersStatusRepository.update(user_status_id, userStatusAlreadyExists)
      .then(f => {
        console.log(f);
        var messagmsgeDelete = {
          message: "Registro atualizado com sucesso"
        }

        return messagmsgeDelete;

      }, err => {
        throw new Error("Erro na atualização");
      });


  }
}

export { UpdateUserStatusService };
