import { connectionSource } from "../../config/ormconfig";
import { User } from "../../entities/User";

interface IUserDelete {
  user_id: string;
}
class DeleteUserService {
  async execute({user_id}:IUserDelete) {

      const usersRepository = connectionSource.getRepository(User);

      if (!user_id) {
          throw new Error("Invalid data");
      }

      const userAlreadyExists = await usersRepository.findOne({
        where: {
          user_id,
        },
      });

      if (!userAlreadyExists) {
          throw new Error("User not exists");
      }

      return await usersRepository.delete(user_id)
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

export { DeleteUserService };
