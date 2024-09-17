import { Request, Response } from 'express';
import { ListExperienceService } from '../../services/Experience/ListExperienceService';

class ListExperienceController {
    async handle(request: Request, response: Response) {

        const listExperienceService = new ListExperienceService();

        const experiences = await listExperienceService.execute();

        return response.json(experiences);
    }
}

export { ListExperienceController };