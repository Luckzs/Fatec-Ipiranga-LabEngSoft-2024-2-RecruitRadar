import { Request, Response } from 'express';

import { ListVacancyStudyService } from '../../../services/VacancyStudy/ListVacancyStudyService';

class ListVacancyStudyController {
    async handle(request: Request, response: Response) {

        const listVacancyStudyService = new ListVacancyStudyService();

        const vacancyStudy = await listVacancyStudyService.execute();

        return response.json(vacancyStudy);
    }
}

export { ListVacancyStudyController };
