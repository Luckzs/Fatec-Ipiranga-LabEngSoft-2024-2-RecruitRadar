import { Request, Response } from 'express';

import { CreateVacancySkillService } from '../../../services/VacancySkill/CreateVacancySkillService';

class CreateVacancySkillController {
    async handle(request: Request, response: Response) {
        const { skill_id, vacancy_id } = request.body;

        const createVacancySkillService = new CreateVacancySkillService();

        const vacancySkill = await createVacancySkillService.execute({
            skill_id,
            vacancy_id
        });

        return response.json(vacancySkill);
    }
}

export { CreateVacancySkillController };