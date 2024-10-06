import { Request, Response } from 'express';
import { CreateExperienceService } from '../../services/Experience/CreateExperienceService';

class CreateExperienceController {
    async handle(request: Request, response: Response) {
        const { title } = request.body;
    
        const createExperienceService = new CreateExperienceService();
    
        const experience = await createExperienceService.execute({
            title
        });
    
        if(experience instanceof Error) {
        return response.status(400).json({
            error: experience.message,
        });
        }
    
        return response.json(experience);
    }
    }

export { CreateExperienceController };