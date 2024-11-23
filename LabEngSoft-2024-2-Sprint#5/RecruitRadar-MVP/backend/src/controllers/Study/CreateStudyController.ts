import { Request, Response } from 'express';
import { CreateStudyService } from '../../services/Study/CreateStudyService';

class CreateStudyController {
    async handle(request: Request, response: Response) {
        const { course_name, level } = request.body;

        const createStudyService = new CreateStudyService();

        const study = await createStudyService.execute({
            course_name, level
        });

        return response.json(study);
    }
}

export { CreateStudyController };