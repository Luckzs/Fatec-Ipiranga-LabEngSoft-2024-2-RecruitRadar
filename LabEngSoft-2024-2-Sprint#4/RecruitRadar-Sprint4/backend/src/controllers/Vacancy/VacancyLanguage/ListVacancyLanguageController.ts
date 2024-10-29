import { Request, Response } from 'express';

import { ListVacancyLanguageService } from '../../../services/VacancyLanguage/ListVacancyLanguageService';

class ListVacancyLanguageController {
    async handle(request: Request, response: Response) {

        const listVacancyLanguageService = new ListVacancyLanguageService();

        const vacancyLanguage = await listVacancyLanguageService.execute();

        return response.json(vacancyLanguage);
    }
}

export { ListVacancyLanguageController };