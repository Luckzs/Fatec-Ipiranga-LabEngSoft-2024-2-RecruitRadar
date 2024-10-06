import { Request, Response } from 'express';
import { UpdateExperienceService } from '../../services/Experience/UpdateExperienceService';

class UpdateExperienceController {
    async handle(request: Request, response: Response) {

        const {experience_id, title } = request.body;

        const updateExperienceService = new UpdateExperienceService();

        const experience = await updateExperienceService.execute({experience_id, title });

        if(experience instanceof Error) {
            return response.status(400).json({
                error: experience.message,
            });
        }

        return response.json(experience);
    }
}

export { UpdateExperienceController };