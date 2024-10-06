import { Request, Response } from 'express';
import { DeleteCandidateStudy } from '../../../services/Candidate/CandidateStudy/DeleteCandidateStudyService';

class DeleteCandidateStudyController {
    async handle(request: Request, response: Response) {

       const  candidate_study_id = request.params.id;

        const deleteCandidateStudy = new DeleteCandidateStudy();

        const msg = await deleteCandidateStudy.execute({
            candidate_study_id
        });

        if (msg instanceof Error) {
            return response.status(400).json({
                error: msg.message,
            });
        }

        return response.json(msg);
    }
}

export { DeleteCandidateStudyController };