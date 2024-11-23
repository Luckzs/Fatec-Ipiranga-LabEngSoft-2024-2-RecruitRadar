import { instanceToPlain } from "class-transformer";
import { connectionSource } from "../../config/ormconfig";
import { VacancySkill } from "../../entities/VacancySkill";

interface IVacancySkillRequest {
    vacancy_id: string;
    skill_id: string;
}

class ListVacancySkillService { 
async execute() {
    const vacancySkillRepository = connectionSource.getRepository(VacancySkill);

    const vacancySkill = await vacancySkillRepository.find({ relations: ["Vacancy", "Skill"] });

    return instanceToPlain(vacancySkill);
}}

export { ListVacancySkillService };