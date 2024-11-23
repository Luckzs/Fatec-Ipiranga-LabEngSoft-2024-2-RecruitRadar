import { VacancySkill } from "../../entities/VacancySkill";
import { connectionSource } from "../../config/ormconfig";

interface IVacancySkillRequest {
    vacancy_id: string;
    skill_id: string;
}

class CreateVacancySkillService {
    async execute({ vacancy_id, skill_id }: IVacancySkillRequest) {
        const vacancySkillRepository = connectionSource.getRepository(VacancySkill);

        if (!vacancy_id || !skill_id ) {
            throw new Error("Invalid data");
        }

        const vacancySkillAlreadyExists = await vacancySkillRepository.findOne({
            where: { vacancy_id, skill_id },
        });

        if (vacancySkillAlreadyExists) {
            throw new Error("Habilidade de Vaga já existente");
        }

        const vacancySkill = vacancySkillRepository.create({
            vacancy_id,
            skill_id,
        });

        await vacancySkillRepository.save(vacancySkill);

        return vacancySkill;
    }
}

export { CreateVacancySkillService };