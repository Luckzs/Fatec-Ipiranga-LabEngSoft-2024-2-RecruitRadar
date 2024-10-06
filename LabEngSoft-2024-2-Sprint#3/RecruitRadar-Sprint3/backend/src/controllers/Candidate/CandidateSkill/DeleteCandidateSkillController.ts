import { Request, Response } from 'express';
import { DeleteCandidateSkillService } from '../../../services/Candidate/CandidateSkill/DeleteCandidateSkillService';

class DeleteCandidateSkillController {
    async handle(request: Request, response: Response) {

        const candidate_skill_id = request.params.id;

        const deleteCandidateSkillService = new DeleteCandidateSkillService();

        const msg = await deleteCandidateSkillService.execute({
            candidate_skill_id
        });

        if (msg instanceof Error) {
            return response.status(400).json({
              error: msg.message,
            });
          }

        return response.json(msg);
    }
}

export { DeleteCandidateSkillController };
