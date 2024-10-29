import { Request, Response } from 'express';

import { ListVacancyExperienceService } from '../../../services/VacancyExperience/ListVacancyExperienceService';

class ListVacancyExperienceController {
    async handle(request: Request, response: Response) {

        const listVacancyExperienceService = new ListVacancyExperienceService();

        const vacancyExperience = await listVacancyExperienceService.execute();

        return response.json(vacancyExperience);
    }
}

export { ListVacancyExperienceController };
