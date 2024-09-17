import { VacancySkill } from "../../entities/VacancySkill";
import { connectionSource } from "../../config/ormconfig";

interface IVacancySkillDelete {
    vacancy_skill_id: string;
}

class DeleteVacancySkillService {
    async execute({ vacancy_skill_id }: IVacancySkillDelete) {
        const vacancySkillRepository = connectionSource.getRepository(VacancySkill);

        if (!vacancy_skill_id) {
            throw new Error("Invalid data");
        }

        const vacancySkill = await vacancySkillRepository.findOne({
            where: { vacancy_skill_id },
        });

        if (!vacancySkill) {
            throw new Error("Habilidade de Vaga não existe");
        }

        return await vacancySkillRepository.delete(vacancy_skill_id)
                        .then(f => {
                            console.log(f);
                            var messageDelete = {
                                message: "Registro deletado com sucesso"
                            }

                            return messageDelete;

                        }, err => {
                            throw new Error("Erro na deleção");
                        }
                    );
    }

}

export { DeleteVacancySkillService };