import { Request, Response } from "express";
import { ListUserService } from "../../services/User/ListUserService";
import { ListCandidateService } from "../../services/Candidate/ListCandidateService";

class ListCandidatesController {
  async handle(request: Request, response: Response) {
  
    const listCandidateService = new ListCandidateService();

    const candidates = await listCandidateService.execute();

    return response.json(candidates);

  }
}

export { ListCandidatesController };