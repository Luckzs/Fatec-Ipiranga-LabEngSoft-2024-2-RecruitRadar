import { Request, Response } from "express";
import { UpdateVacancySkillService } from "../../../services/VacancySkill/UpdateVacancySkillService";


class UpdateVacancySkillController {
  async handle(request: Request, response: Response) {
    const { vacancy_skill_id, vacancy_id, skill_id } = request.body;

    const updateVacancySkillService = new UpdateVacancySkillService();

    const vacancySkill = await updateVacancySkillService.execute({
        vacancy_skill_id, vacancy_id, skill_id,

    });

    return response.json(vacancySkill);
  }
}

export { UpdateVacancySkillController };
