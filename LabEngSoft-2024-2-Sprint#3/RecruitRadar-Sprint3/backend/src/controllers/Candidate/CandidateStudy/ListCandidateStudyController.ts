import { Request, Response } from 'express';
import { ListCandidateStudyService } from '../../../services/Candidate/CandidateStudy/ListCandidateStudyService';

class ListCandidateStudyController {
    async handle(request: Request, response: Response) {

        const listCandidateStudyService = new ListCandidateStudyService();

        const candidateStudy = await listCandidateStudyService.execute();

        return response.json(candidateStudy);
    }
}

export { ListCandidateStudyController };
