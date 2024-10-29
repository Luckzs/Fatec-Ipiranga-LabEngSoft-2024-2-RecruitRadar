import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import config from "../../config/config";
import { connectionSource } from "../../config/ormconfig";
import { User } from "../../entities/User";

interface IAuthenticateRequest {
  email: string;
  password: string;
}

class AuthenticateUserService {
  async execute({ email, password }: IAuthenticateRequest) {

    //const usersRepositories = getCustomRepository(UsersRepositories);
    const usersRepositories  = connectionSource.getRepository(User);

    // Verificar se email existe
    const user = await usersRepositories.findOne(
      { where: { email } },
    );

    if(!user){
        throw new Error("Email ou Senha incorretos");
    }
    const passwordMatch = await compare(password, user?.password);

    if (!passwordMatch) {
      throw  Error("Email ou Senha incorretos");
    }
    // Gerar token
    const token = sign(
      {
        email:user.email,
      },
      //"4f93ac9d10cb751b8c9c646bc9dbccb9",
      config.SECRET,
      {
        subject: (user.admin?"Admin":"others"),
        expiresIn: "1d",
      }
    );
    
    return token;
  }
}

export { AuthenticateUserService };
