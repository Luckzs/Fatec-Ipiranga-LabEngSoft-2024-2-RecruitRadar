import { Request, Response } from 'express';

import { UpdateVacancyExperienceService } from '../../../services/VacancyExperience/UpdateVacancyExperienceService';

class UpdateVacancyExperienceController {
    async handle(request: Request, response: Response) {

        const { vacancy_experience_id,vacancy_id, experience_id, period } = request.body;

        const updateVacancyExperienceService = new UpdateVacancyExperienceService();

        const vacancyExperience = await updateVacancyExperienceService.execute({ vacancy_experience_id, vacancy_id, experience_id, period });

        return response.json(vacancyExperience);
    }
}

export { UpdateVacancyExperienceController };
