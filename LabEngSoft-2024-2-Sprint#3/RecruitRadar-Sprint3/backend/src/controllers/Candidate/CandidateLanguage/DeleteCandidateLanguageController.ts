import { Request, Response } from 'express';
import { DeleteCandidateLanguage } from '../../../services/Candidate/CandidateLanguage/DeleteCandidateLanguageService';


class DeleteCandidateLanguageController {
    async handle(request: Request, response: Response) {

        const candidate_language_id =  request.params.id;
        
        const deleteCandidateLanguageService = new DeleteCandidateLanguage();

        const msg = await deleteCandidateLanguageService.execute({candidate_language_id});

        if (msg instanceof Error) {
            return response.status(400).json({
              error: msg.message,
            });
          }

        return response.json(msg);
    }
}

export { DeleteCandidateLanguageController };