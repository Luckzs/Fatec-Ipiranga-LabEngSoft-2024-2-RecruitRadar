import { connectionSource } from "../../../config/ormconfig";
import { Userstatus } from "../../../entities/UserStatus";

interface IUserStatusDelete {
  user_status_id: string;
}
class DeleteUserStatusService {
  async execute({user_status_id}:IUserStatusDelete) {

      console.log(user_status_id);
      const usersStatusRepository = connectionSource.getRepository(Userstatus);

      const userAlreadyExists = await usersStatusRepository.findOne({
        where: {
          user_status_id,
        },
      });

      if (!userAlreadyExists) {
          throw new Error("User not exists");
      }

      return await usersStatusRepository.delete(user_status_id)
            .then(f => {
                console.log(f);
                var messagmsgeDelete = {
                  message:"Registro excluido com sucesso"
                }
            
                return messagmsgeDelete;
                
            }, err => {
              throw new Error("Erro na exclusão");
            });
  }
}

export { DeleteUserStatusService };
