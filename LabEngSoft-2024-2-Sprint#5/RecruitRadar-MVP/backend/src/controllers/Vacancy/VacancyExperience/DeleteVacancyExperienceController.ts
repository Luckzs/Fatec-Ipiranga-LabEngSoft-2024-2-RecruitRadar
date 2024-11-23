import { Request, Response } from 'express';

import { DeleteVacancyExperienceService } from '../../../services/VacancyExperience/DeleteVacancyExperienceService';

class DeleteVacancyExperienceController {
    async handle(request: Request, response: Response) {

        const vacancy_experience_id  = request.params.id;

        const deleteVacancyExperienceService = new DeleteVacancyExperienceService();

        const vacancyExperience = await deleteVacancyExperienceService.execute({ vacancy_experience_id });

        return response.json(vacancyExperience);
    }
}

export { DeleteVacancyExperienceController };
