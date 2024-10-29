import { Request, Response } from "express";
import { UpdateUserService } from "../../services/User/UpdateUserService";

class UpdateUserController {

  async handle(request: Request, response: Response) {
    const { user_id, name, email, admin, password } = request.body;

    console.log(user_id)
    console.log(name)
    console.log(email)
    console.log(admin)
    console.log(password)

    const updateUserService = new UpdateUserService();

    const user = await updateUserService.execute({
      user_id,
      name,
      email,
      admin,
      password
    });

    if (user instanceof Error) {
      return response.status(400).json({
        error: user.message,
      });
    }
    return response.json(user);
  }
}

export { UpdateUserController };