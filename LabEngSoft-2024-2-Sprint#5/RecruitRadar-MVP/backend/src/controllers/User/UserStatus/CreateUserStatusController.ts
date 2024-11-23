import { Request, Response } from "express";
import { CreateUserStatusService } from "../../../services/User/UserStatus/CreateUserStatusService";

class CreateUserStatusController {

  async handle(request: Request, response: Response) {
    const { name} = request.body;

   console.log(name)
   
   const createUserStatusService = new CreateUserStatusService();

   const user = await createUserStatusService.execute({
     name
   });

   return response.json(user);
  }
}

export { CreateUserStatusController };