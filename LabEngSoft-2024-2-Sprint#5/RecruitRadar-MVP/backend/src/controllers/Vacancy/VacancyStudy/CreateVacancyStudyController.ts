import { Request, Response } from 'express';
import { CreateVacancyStudyService } from '../../../services/VacancyStudy/CreateVacancyStudyService';

class CreateVacancyStudyController {
    async handle(request: Request, response: Response) {

        const { vacancy_id, study_id,situation,start_date,completion_date } = request.body;

        const createVacancyStudyService = new CreateVacancyStudyService();

        const vacancyStudy = await createVacancyStudyService.execute({ vacancy_id, study_id,situation,start_date,completion_date });

        return response.json(vacancyStudy);
        
    }
}

export { CreateVacancyStudyController
    };