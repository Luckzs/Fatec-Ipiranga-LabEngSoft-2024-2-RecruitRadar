import { Request, Response } from 'express';
import { ListMatchService } from '../../services/Match/ListMatchService';

class ListMatchController {
    async handle(request: Request, response: Response) {

        const listMatchService = new ListMatchService();

        const match = await listMatchService.execute();

        return response.json(match);
    }
}

export { ListMatchController };
