import { hash } from "bcryptjs";
import { connectionSource } from "../../config/ormconfig";
import { User } from "../../entities/User";

interface IResetPasswordRequest {
  tmpToken: string;
  password: string;
}

class ResetPasswordService {
  async execute({tmpToken,password }: IResetPasswordRequest) {

    const usersRepository = connectionSource.getRepository(User);

    if (!tmpToken) {
      return Error("Invalid data");
    }

    const userAlreadyExists = await usersRepository.findOne({
      where: {
        passwordResetToken: tmpToken
      },
    });

    if (!userAlreadyExists) {
      return Error("Token Temporário não encontrado")
    }

    const now = new Date() ;
    if(now > userAlreadyExists.passwordResetExpires)
    {
      return Error("Token Expirado, gere um novo");
    }

    userAlreadyExists.updated_at = new Date()
    userAlreadyExists.password = await hash(password, 8);

    return await usersRepository.update(userAlreadyExists.user_id,userAlreadyExists)
      .then(f => {
        console.log(f);
        var messagmsgeDelete = {
          message: "Registro atualizado com sucesso"
        }

        return messagmsgeDelete;

      }, err => {
        return Error("Erro na atualização");
      });

  }
}

export { ResetPasswordService };
