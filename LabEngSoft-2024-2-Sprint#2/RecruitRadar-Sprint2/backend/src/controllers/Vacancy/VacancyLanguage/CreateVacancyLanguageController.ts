import { Request, Response } from 'express';

import { CreateVacancyLanguageService } from '../../../services/VacancyLanguage/CreateVacancyLanguageService';

class CreateVacancyLanguageController {
    async handle(request: Request, response: Response) {

        const { vacancy_id, language_id, level } = request.body;

        const createVacancyLanguageService = new CreateVacancyLanguageService();

        const vacancyLanguage = await createVacancyLanguageService.execute({ vacancy_id, language_id, level  });

        return response.json(vacancyLanguage);
    }
}

export { CreateVacancyLanguageController };
