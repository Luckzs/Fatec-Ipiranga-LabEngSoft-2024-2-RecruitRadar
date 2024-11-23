import { Request, Response } from "express";
import { UpdateUserService } from "../../services/User/UpdateUserService";
import { ResetPasswordService } from "../../services/User/ResetPasswordService";

class ResetPasswordController {

  async handle(request: Request, response: Response) {
    const {tmpToken} = request.params;
    const {password} = request.body;


    const resetPasswordService = new ResetPasswordService();

    const user = await resetPasswordService.execute({
      tmpToken,
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

export { ResetPasswordController };