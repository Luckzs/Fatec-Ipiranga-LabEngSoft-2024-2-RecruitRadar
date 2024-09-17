import { Request, Response } from "express";
import { DeleteUserStatusService } from "../../../services/User/UserStatus/DeleteUserStatusService";

class DeleteUserStatusController {
  async handle(request: Request, response: Response) {

    const user_status_id = request.params.id;
    console.log(user_status_id)
    const deleteUserStatusService = new DeleteUserStatusService();

    const msg = await deleteUserStatusService.execute({
      user_status_id
    });

    if (msg instanceof Error) {
      return response.status(400).json({
        error: msg.message,
      });
    }

    return response.json(msg);

  }
}

export { DeleteUserStatusController };