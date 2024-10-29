import { Request, Response } from 'express';
import { UpdateMatchService } from '../../services/Match/UpdateMatchService';

class UpdateMatchController {
    async handle(request: Request, response: Response) {

        const {  match_id, candidate_id, vacancy_id, score } = request.body;

        const updateMatchService = new UpdateMatchService();

        const matchUpdated = await updateMatchService.execute({  match_id, candidate_id, vacancy_id, score});

        return response.json(matchUpdated);
    }
}

export { UpdateMatchController };
