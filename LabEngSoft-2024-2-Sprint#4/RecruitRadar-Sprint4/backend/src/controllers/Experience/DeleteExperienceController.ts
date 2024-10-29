import { Request, Response } from 'express';
import { DeleteExperienceService } from '../../services/Experience/DeleteExperienceService';

class DeleteExperienceController {
    async handle(request: Request, response: Response) {
        const experience_id = request.params.id;

        const  deleteExperienceService = new DeleteExperienceService();

        const msg = await deleteExperienceService.execute({
            experience_id
        });
        
        if(msg instanceof Error) {
            return response.status(400).json({
                error: msg.message,
            });
        }

        return response.json(msg);

    }
}

export { DeleteExperienceController };