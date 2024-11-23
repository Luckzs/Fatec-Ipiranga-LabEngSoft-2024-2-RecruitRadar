import { VacancyLanguage } from "../../entities/VacancyLanguage";
import { connectionSource } from "../../config/ormconfig";

interface IVacancyLanguageDelete {
    vacancy_language_id: string;
}


class DeleteVacancyLanguageService {
    async execute({ vacancy_language_id }: IVacancyLanguageDelete) {
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

        return await vacancyLanguageRepository.delete(vacancy_language_id)
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

export { DeleteVacancyLanguageService };