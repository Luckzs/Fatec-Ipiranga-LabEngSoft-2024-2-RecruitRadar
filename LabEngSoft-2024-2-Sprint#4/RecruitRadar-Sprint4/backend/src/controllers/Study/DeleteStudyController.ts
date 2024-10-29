import { Request, Response } from 'express';
import { DeleteStudyService } from '../../services/Study/DeleteStudyService';

class DeleteStudyController {
    async handle(request: Request, response: Response) {
        const study_id = request.params.id;

        const deleteStudyService = new DeleteStudyService();

        const msg =  await deleteStudyService.execute({study_id});

        if (msg instanceof Error) {
            return response.status(400).json({
                error: msg.message,
            });
        }

        return response.json(msg);
        
    }
}

export { DeleteStudyController };
