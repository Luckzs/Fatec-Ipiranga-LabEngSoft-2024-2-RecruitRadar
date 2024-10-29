import { hash } from "bcryptjs";
import { connectionSource } from "../../config/ormconfig";
import { User } from "../../entities/User";

interface IUserRequest {
  user_id: string;
  name: string;
  email: string;
  admin: boolean;
  password: string;
}

class UpdateUserService {
  async execute({ user_id, name, email, admin, password }: IUserRequest) {

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
      throw new Error("User not exists")
    }

    userAlreadyExists.name = name ? name : userAlreadyExists.name;
    userAlreadyExists.email = email ? email : userAlreadyExists.email;
    userAlreadyExists.admin = admin ? admin : userAlreadyExists.admin;
    userAlreadyExists.updated_at = new Date()
    userAlreadyExists.password = password ? await hash(password, 8) : userAlreadyExists.password;

    return await usersRepository.update(user_id, userAlreadyExists)
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

export { UpdateUserService };
