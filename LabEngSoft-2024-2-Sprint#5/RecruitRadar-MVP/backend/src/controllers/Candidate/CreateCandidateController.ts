import { Request, Response } from "express";
import { CreateUserService } from "../../services/User/CreateUserService";
import { CreateCandidateService } from "../../services/Candidate/CreateCandidateService";

class CreateCandidateController {

  async handle(request: Request, response: Response) {
    const {CPF,full_name,sex,pcd,birth_date,address,city,state,postal_code,distance_radius,user_id} = request.body;
   console.log("Creating candidate...");
   const createCandidateService = new CreateCandidateService();

   try {
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

   console.log("Candidate created successfully");
   return response.json(candidate);
  }catch(err: any) {
    console.error("Error creating candidate:", err.message);
    return response.status(400).json({
      message: err.message
    });
  }
}
}

export { CreateCandidateController };