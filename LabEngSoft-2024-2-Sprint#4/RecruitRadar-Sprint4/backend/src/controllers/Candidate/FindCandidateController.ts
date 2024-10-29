import { Request, Response } from "express";
import { FindCandidateService } from "../../services/Candidate/FindCandidateService";

class FindCandidateController {
  async handle(request: Request, response: Response) {

    const email = request.params.email;
    const findCandidateService = new FindCandidateService();

    const candidate = await findCandidateService.execute({
        email
    });

    return response.json(candidate);
  }
}

export { FindCandidateController };