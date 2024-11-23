import { Request, Response } from "express";
import { ForgotPasswordService } from "../../services/User/ForgotPasswordService";

class ForgotPasswordController {
  async handle(request: Request, response: Response) {
    const {email} = request.body;

    const forgotPasswordService = new ForgotPasswordService();

    const pass = await forgotPasswordService.execute({
      email
    });

    if (pass instanceof Error) {
      console.log(pass.message);
      return response.status(400).json({error: pass.message});
    }

    return response.json(pass);
  }
}

export { ForgotPasswordController };