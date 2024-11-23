import { Request, Response } from 'express';

import { DeleteVacancySkillService } from '../../../services/VacancySkill/DeleteVacancySkillService';

class DeleteVacancySkillController {
    async handle(request: Request, response: Response) {
        const vacancy_skill_id= request.params.id;

        const deleteVacancySkillService = new DeleteVacancySkillService();

        const msg =  await deleteVacancySkillService.execute({ vacancy_skill_id });

        if (msg instanceof Error) {
            return response.status(400).json({
                error: msg.message,
            });
        }

        return response.json(msg);

    }
}

export { DeleteVacancySkillController };

