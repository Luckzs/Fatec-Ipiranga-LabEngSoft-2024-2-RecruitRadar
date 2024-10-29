import { Request, Response } from "express";
import { CreateUserService } from "../../services/User/CreateUserService";

class CreateUserController {

  async handle(request: Request, response: Response) {
    const { name, email, password } = request.body;

    console.log(request.body);
    const createUserService = new CreateUserService();

    try {
      const user = await createUserService.execute({
        name,
        email,
        password
      });

      return response.json(user);
    }
    catch (err:any) {
      return response.status(400).json({
        message: err.message
      });
    }
  }

}

export { CreateUserController };