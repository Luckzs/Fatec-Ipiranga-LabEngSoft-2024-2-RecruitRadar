import { VacancyLanguage } from "../../entities/VacancyLanguage";
import { connectionSource } from "../../config/ormconfig";

interface IVacancyLanguageRequest {
    vacancy_id: string;
    language_id: string;
    level: string;
}

class CreateVacancyLanguageService {
    async execute({ vacancy_id, language_id, level }: IVacancyLanguageRequest) {
        const vacancyLanguageRepository = connectionSource.getRepository(VacancyLanguage);

        if (!vacancy_id || !language_id || !level) {
            throw new Error("Invalid data");
        }

        const vacancyLanguageAlreadyExists = await vacancyLanguageRepository.findOne({
            where: { vacancy_id, language_id },
        });

        if (vacancyLanguageAlreadyExists) {
            throw new Error("Linguagem de Vaga já existente");
        }

        const vacancyLanguage = vacancyLanguageRepository.create({
            vacancy_id,
            language_id,
            level,
        });

        await vacancyLanguageRepository.save(vacancyLanguage);

        return vacancyLanguage;
    }
}

export { CreateVacancyLanguageService };