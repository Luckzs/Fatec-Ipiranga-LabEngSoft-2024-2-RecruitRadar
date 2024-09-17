import { Request, Response } from 'express';

import { UpdateVacancyLanguageService } from '../../../services/VacancyLanguage/UpdateVacancyLanguageService';

class UpdateVacancyLanguageController {
    async handle(request: Request, response: Response) {

       
        const { vacancy_language_id, vacancy_id, language_id, level } = request.body;

        const updateVacancyLanguageService = new UpdateVacancyLanguageService();

        const vacancyLanguage = await updateVacancyLanguageService.execute({ vacancy_language_id, language_id, vacancy_id,level });

        return response.json(vacancyLanguage);
    }
}

export { UpdateVacancyLanguageController };
