import { Request, Response } from "express";
import { DeleteUserService } from "../../services/User/DeleteUserService";
import { DeleteCandidateService } from "../../services/Candidate/DeleteCandidateService";

class DeleteCandidateController {
  async handle(request: Request, response: Response) {

    const candidate_id = request.params.id;
    console.log(candidate_id)
    const deleteCandidateService = new DeleteCandidateService();

    const msg = await deleteCandidateService.execute({
      candidate_id
    });

    if (msg instanceof Error) {
      return response.status(400).json({
        error: msg.message,
      });
    }

    return response.json(msg);

  }
}

export { DeleteCandidateController };