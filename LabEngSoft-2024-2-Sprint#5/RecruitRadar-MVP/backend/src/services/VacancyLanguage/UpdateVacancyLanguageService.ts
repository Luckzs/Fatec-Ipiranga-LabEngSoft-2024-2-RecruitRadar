import { VacancyLanguage } from "../../entities/VacancyLanguage";
import { connectionSource } from "../../config/ormconfig";

interface IVacancyLanguageRequest {
    vacancy_language_id: string;
    vacancy_id: string;
    language_id: string;
    level: string;
}

class UpdateVacancyLanguageService {
    async execute({ vacancy_language_id, vacancy_id, language_id, level }: IVacancyLanguageRequest) {
        const vacancyLanguageRepository = connectionSource.getRepository(VacancyLanguage);

        if (!vacancy_language_id) {
            throw new Error("Invalid data");
        }

        const vacancyLanguage = await vacancyLanguageRepository.findOne({
            where: { vacancy_language_id },
        });

        if (!vacancyLanguage) {
            throw new Error("Linguagem de Vaga não existe");
        }

        vacancyLanguage.level = level? level : vacancyLanguage.level;
        vacancyLanguage.vacancy_id = vacancy_id? vacancy_id : vacancyLanguage.vacancy_id;
        vacancyLanguage.language_id = language_id? language_id : vacancyLanguage.language_id;
        vacancyLanguage.updated_at = new Date();


        return await vacancyLanguageRepository.update(vacancy_language_id, vacancyLanguage)
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

export { UpdateVacancyLanguageService };