import { Request, Response } from 'express';
import { UpdateStudyService } from '../../services/Study/UpdateStudyService';

class UpdateStudyController {
    async handle(request: Request, response: Response) {
        const { study_id, course_name, level }= request.body;

        const updateStudyService = new UpdateStudyService();

        const study = await updateStudyService.execute({
            study_id,
            course_name,
            level
        });

        if (study instanceof Error) {
            return response.status(400).json({ error: study.message });
        }

        return response.json(study);
    }
}

export { UpdateStudyController };
