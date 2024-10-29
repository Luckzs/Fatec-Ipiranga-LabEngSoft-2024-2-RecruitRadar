import { Request, Response } from "express";
import { UpdateUserStatusService } from "../../../services/User/UserStatus/UpdateUserStatusService";

class UpdateUserStatusController {

  async handle(request: Request, response: Response) {
    const { user_status_id, name } = request.body;

    console.log(user_status_id)
    console.log(name)

    const updateUserStatusService = new UpdateUserStatusService();

    const user = await updateUserStatusService.execute({
      user_status_id,
      name
    });

    if (user instanceof Error) {
      return response.status(400).json({
        error: user.message,
      });
    }
    return response.json(user);
  }
}

export { UpdateUserStatusController };