import { Request, Response } from 'express';

import {ListVacancyWithoutMatchService} from '../../services/Vacancy/ListVacancyWithoutMatchService';


class ListVacancyWithoutMatchController {
    async handle(request: Request, response: Response) {

        const listVacancyWithoutMatchService = new ListVacancyWithoutMatchService();

        const vacancy = await listVacancyWithoutMatchService.execute();

        return response.json(vacancy);
    }
}

export { ListVacancyWithoutMatchController };
