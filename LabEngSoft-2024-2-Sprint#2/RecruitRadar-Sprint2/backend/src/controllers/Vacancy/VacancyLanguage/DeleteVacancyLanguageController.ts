import { Request, Response } from 'express';

import { DeleteVacancyLanguageService } from '../../../services/VacancyLanguage/DeleteVacancyLanguageService';

class DeleteVacancyLanguageController {
    async handle(request: Request, response: Response) {

        const vacancy_language_id = request.params.id;

        const deleteVacancyLanguageService = new DeleteVacancyLanguageService();

        const msg = await deleteVacancyLanguageService.execute({ vacancy_language_id });

        if (msg instanceof Error) {
            return response.status(400).json({
                error: msg.message,
            });
        }

        return response.json(msg);

    }
}

export { DeleteVacancyLanguageController };