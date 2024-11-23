import { Request, Response } from "express";
import { DeleteUserService } from "../../services/User/DeleteUserService";

class DeleteUserController {
  async handle(request: Request, response: Response) {

    const user_id = request.params.id;
    console.log(user_id)
    const deleteUserService = new DeleteUserService();

    const msg = await deleteUserService.execute({
      user_id
    });

    if (msg instanceof Error) {
      return response.status(400).json({
        error: msg.message,
      });
    }

    return response.json(msg);

  }
}

export { DeleteUserController };