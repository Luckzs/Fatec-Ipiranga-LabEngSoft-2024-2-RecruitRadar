import { Request, Response } from "express";
import { DeleteCandidateExperienceService } from "../../../services/Candidate/CandidateExperience/DeleteCandidateExperienceService";

class DeleteCandidateExperienceController {
    async handle(request: Request, response: Response) {

        const candidate_experience_id = request.params.id;

        const deleteCandidateExperienceService = new DeleteCandidateExperienceService();

        const msg = await deleteCandidateExperienceService.execute({
            candidate_experience_id
        });

        if (msg instanceof Error) {
            return response.status(400).json({
              error: msg.message,
            });
          }

        return response.json(msg);

    }
}

export { DeleteCandidateExperienceController };