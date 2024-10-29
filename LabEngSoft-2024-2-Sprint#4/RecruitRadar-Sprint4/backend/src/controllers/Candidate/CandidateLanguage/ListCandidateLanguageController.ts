import { Request, Response } from 'express';
import { ListCandidateLanguageService } from '../../../services/Candidate/CandidateLanguage/ListCandidateLanguageService';

class ListCandidateLanguageController {
    async handle(request: Request, response: Response) {
        const listCandidateLanguageService = new ListCandidateLanguageService();

        const candidateLanguage = await listCandidateLanguageService.execute();

        return response.json(candidateLanguage);
    }
}

export { ListCandidateLanguageController };
