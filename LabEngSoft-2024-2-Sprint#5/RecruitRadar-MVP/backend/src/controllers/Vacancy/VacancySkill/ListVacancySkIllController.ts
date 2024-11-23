import { Request, Response } from 'express';

import { ListVacancySkillService } from '../../../services/VacancySkill/ListVacancySkillService';

class ListVacancySkillController {
    async handle(request: Request, response: Response) {

        const listVacancySkillService = new ListVacancySkillService();

        const vacancySkill = await listVacancySkillService.execute();

        return response.json(vacancySkill);
    }
}

export { ListVacancySkillController };
