import { VacancyExperience } from "../../entities/VacancyExperience";
import { connectionSource } from "../../config/ormconfig";

interface IVacancyExperienceDelete {
    vacancy_experience_id: string;
}

class DeleteVacancyExperienceService {
    async execute({ vacancy_experience_id }: IVacancyExperienceDelete) {
        const vacancyExperienceRepository = connectionSource.getRepository(VacancyExperience);

        if (!vacancy_experience_id) {
            throw new Error("Invalid data");
        }

        const vacancyExperience = await vacancyExperienceRepository.findOne({
            where: { vacancy_experience_id },
        });

        if (!vacancyExperience) {
            throw new Error("Experiência de Vaga não existe");
        }

        return await vacancyExperienceRepository.delete(vacancy_experience_id)
                        .then(f => {
                            console.log(f);
                            var messageDelete = {
                                message: "Registro excluido com sucesso"
                            }

                            return messageDelete;

                        }, err => {
                            throw new Error("Erro na exclusão");
                        }
                    );

    }
}

export { DeleteVacancyExperienceService };