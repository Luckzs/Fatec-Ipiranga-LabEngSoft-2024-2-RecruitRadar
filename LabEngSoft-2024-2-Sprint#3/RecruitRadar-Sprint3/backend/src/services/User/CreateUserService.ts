import { hash } from "bcryptjs";

import { connectionSource } from "../../config/ormconfig";
import { User } from "../../entities/User";
import { Userstatus } from "../../entities/UserStatus";
import { sign } from "jsonwebtoken";
import config from "../../config/config";


interface IUserRequest {
    name: string;
    email: string;
    admin?: boolean;
    password: string;
    user_status_id?: string;
 }

 class CreateUserService {
    async execute({ name, email, admin = false, password, user_status_id=""}: IUserRequest) {
      
     //const usersRepository = getCustomRepository(UsersRepositories);
      const usersRepository = connectionSource.getRepository(User);
      const userStatusRepository = connectionSource.getRepository(Userstatus);

      if (!email) {
        throw new Error("Email incorreto");
      }

      const userAlreadyExists = await usersRepository.findOne(
        { where: { email } },
      );
  
    if (userAlreadyExists) {
      throw new Error("User already exists");
    }

    const passwordHash = await hash(password, 8);
    
    const userStatus = await userStatusRepository.findOne({where: {name: 'Ativo!'}});
    user_status_id = <string> userStatus?.user_status_id;
    
    const user = usersRepository.create({
      name,
      email,
      admin,
      password: passwordHash,
      user_status_id
    });
    await usersRepository.save(user);

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
  export { CreateUserService };
