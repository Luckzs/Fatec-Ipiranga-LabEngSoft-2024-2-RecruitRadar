import { Request, Response } from 'express';

import { UpdateVacancyStudyService } from '../../../services/VacancyStudy/UpdateVacancyStudyService';

class UpdateVacancyStudyController {
    async handle(request: Request, response: Response) {

        const {vacancy_study_id, vacancy_id, study_id, situation, start_date, completion_date} = request.body;

        const updateVacancyStudyService = new UpdateVacancyStudyService();

        const vacancyStudy = await updateVacancyStudyService.execute({ vacancy_study_id, vacancy_id, study_id, situation, start_date, completion_date });

        return response.json(vacancyStudy);
    }
}

export { UpdateVacancyStudyController };
