import { Request, Response } from 'express';

import { DeleteMatchService } from '../../services/Match/DeleteMatchService';

class DeleteMatchController {
    async handle(request: Request, response: Response) {

        const  match_id = request.params.id;

        const deleteMatchService = new DeleteMatchService();

        const msg = await deleteMatchService.execute({
            match_id
        });

        if (msg instanceof Error) {
            return response.status(400).json({
                error: msg.message,
            });
        }

        return response.json(msg);
    }
}

export { DeleteMatchController };