import { Request, Response } from 'express';
import { ListAppliedVacancyService } from '../../services/Vacancy/ListAppliedVacancyService';

class ListAppliedVacancyController {
    async handle(request: Request, response: Response) {

        const email = request.params.email;

        const listAppliedVacancyService = new ListAppliedVacancyService();

        const vacancy = await listAppliedVacancyService.execute(email);

        return response.json(vacancy);
    }
}

export { ListAppliedVacancyController };
