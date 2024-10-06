import { Request, Response } from 'express';
import { ListStudyService } from '../../services/Study/ListStudyService';

class ListStudyController {
    async handle(request: Request, response: Response) {

        const listStudyService = new ListStudyService();

        const studies = await listStudyService.execute();

        return response.json(studies);

    }
    
}

export { ListStudyController };
