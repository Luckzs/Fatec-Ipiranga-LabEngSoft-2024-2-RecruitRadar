import { Request, Response } from 'express';

import { ListVacancyService } from '../../services/Vacancy/ListVacancyService';

class ListVacancyController {
    async handle(request: Request, response: Response) {

        const listVacancyService = new ListVacancyService();

        const vacancy = await listVacancyService.execute();

        return response.json(vacancy);
    }
}

export { ListVacancyController };
