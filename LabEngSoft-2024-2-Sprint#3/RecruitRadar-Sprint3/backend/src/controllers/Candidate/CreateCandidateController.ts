import { Request, Response } from "express";
import { CreateUserService } from "../../services/User/CreateUserService";
import { CreateCandidateService } from "../../services/Candidate/CreateCandidateService";

class CreateCandidateController {

  async handle(request: Request, response: Response) {
    const {CPF,full_name,sex,pcd,birth_date,address,city,state,postal_code,distance_radius,user_id} = request.body;
   
   const createCandidateService = new CreateCandidateService();

   const candidate = await createCandidateService.execute({
      CPF,
      full_name,
      sex,
      pcd,
      birth_date,
      address,
      city,
      state,
      postal_code,
      distance_radius,
      user_id
   });

   return response.json(candidate);
  }
}

export { CreateCandidateController };