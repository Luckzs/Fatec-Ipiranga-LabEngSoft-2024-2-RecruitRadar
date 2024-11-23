import { VacancySkill } from "../../entities/VacancySkill";
import { connectionSource } from "../../config/ormconfig";

interface IVacancySkillRequest {
    vacancy_skill_id: string;
    vacancy_id: string;
    skill_id: string;
}

class UpdateVacancySkillService {
    async execute({ vacancy_skill_id, vacancy_id, skill_id }: IVacancySkillRequest) {
        const vacancySkillRepository = connectionSource.getRepository(VacancySkill);

        if (!vacancy_id || !skill_id) {
            throw new Error("Invalid data");
        }

        const vacancySkill = await vacancySkillRepository.findOne({
            where: { vacancy_skill_id },
        });

        if (!vacancySkill) {
            throw new Error("Habilidade de Vaga não existe");
        }

        vacancySkill.vacancy_id = vacancy_id? vacancy_id : vacancySkill.vacancy_id;
        vacancySkill.skill_id = skill_id? skill_id : vacancySkill.skill_id;

        return await vacancySkillRepository.update(vacancy_skill_id, vacancySkill).then(f => {
            console.log(f);
            var messageDelete = {
                message: "Registro atualizado com sucesso"
            }

            return messageDelete;

        }, err => {
            throw new Error("Erro na atualização");
        }
    );
    }
}

export { UpdateVacancySkillService };