import { Request, Response } from 'express';
import { ListCandidateSkillService } from '../../../services/Candidate/CandidateSkill/ListCandidateSkillService';

class ListCandidateSkillController {
    async handle(request: Request, response: Response) {

        const listCandidateSkillService = new ListCandidateSkillService();

        const candidateSkill = await listCandidateSkillService.execute();

        return response.json(candidateSkill);
    }
}

export { ListCandidateSkillController };
