import { VacancyExperience } from "../../entities/VacancyExperience";
import { connectionSource } from "../../config/ormconfig";

interface IVacancyExperienceRequest {
    vacancy_experience_id: string;
    vacancy_id: string;
    experience_id: string;
    period: string;
}

class UpdateVacancyExperienceService {
    async execute({ vacancy_experience_id,vacancy_id, experience_id, period }: IVacancyExperienceRequest) {
        const vacancyExperienceRepository = connectionSource.getRepository(VacancyExperience);

        if (!vacancy_experience_id) {
            throw new Error("Invalid data");
        }

        const vacancyExperience = await vacancyExperienceRepository.findOne({
            where: { vacancy_experience_id},
        });

        if (!vacancyExperience) {
            throw new Error("Experiência de Vaga não existe");
        }

        vacancyExperience.period = period? period : vacancyExperience.period;
        vacancyExperience.experience_id = experience_id? experience_id : vacancyExperience.experience_id;
        vacancyExperience.vacancy_id = vacancy_id? vacancy_id : vacancyExperience.vacancy_id;
        vacancyExperience.updated_at = new Date();


        return await vacancyExperienceRepository.update(vacancy_experience_id, vacancyExperience)
                        .then(f => {
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

export { UpdateVacancyExperienceService };