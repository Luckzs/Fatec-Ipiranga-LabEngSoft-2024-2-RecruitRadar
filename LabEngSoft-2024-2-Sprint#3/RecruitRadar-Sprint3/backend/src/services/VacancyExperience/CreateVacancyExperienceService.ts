import { VacancyExperience } from "../../entities/VacancyExperience";
import { connectionSource } from "../../config/ormconfig";

interface IVacancyExperienceRequest {
    vacancy_id: string;
    experience_id: string;
    period: string;
}

class CreateVacancyExperienceService {
    async execute({ vacancy_id, experience_id,period }: IVacancyExperienceRequest) {
        const vacancyExperienceRepository = connectionSource.getRepository(VacancyExperience);

        if (!vacancy_id || !experience_id) {
            throw new Error("Invalid data");
        }

        const vacancyExperienceAlreadyExists = await vacancyExperienceRepository.findOne({
            where: { vacancy_id, experience_id },
        });

        if (vacancyExperienceAlreadyExists) {
            throw new Error("Experiência de Vaga já existente");
        }

        const vacancyExperience = vacancyExperienceRepository.create({
            vacancy_id,
            experience_id,
            period
        });

        await vacancyExperienceRepository.save(vacancyExperience);

        return vacancyExperience;
    }
}

export { CreateVacancyExperienceService };

