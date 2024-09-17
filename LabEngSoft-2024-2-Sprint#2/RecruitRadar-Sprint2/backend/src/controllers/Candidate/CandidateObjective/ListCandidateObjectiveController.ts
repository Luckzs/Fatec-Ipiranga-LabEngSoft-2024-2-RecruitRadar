import { Request, Response } from 'express';
import { ListCandidateObjective } from '../../../services/Candidate/CandidateObjective/ListCandidateObjectiveService';

class ListCandidateObjectiveController {
    async handle(request: Request, response: Response) {
        const listCandidateObjective = new ListCandidateObjective();

        const candidateObjectives = await listCandidateObjective.execute();

        return response.json(candidateObjectives);
    }
}

export { ListCandidateObjectiveController };