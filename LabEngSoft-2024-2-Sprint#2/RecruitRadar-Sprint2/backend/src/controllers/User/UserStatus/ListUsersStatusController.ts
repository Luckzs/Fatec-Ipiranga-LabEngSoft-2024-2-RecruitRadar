import { Request, Response } from "express";
import { ListUserStatusService } from "../../../services/User/UserStatus/ListUserStatusService";

class ListUsersStatusController {
  async handle(request: Request, response: Response) {
  
    const listUsersStatusService = new ListUserStatusService();

    const usersStatus = await listUsersStatusService.execute();

    return response.json(usersStatus);

  }
}

export { ListUsersStatusController };