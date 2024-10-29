import { Vacancy } from "../../entities/Vacancy";
import { connectionSource } from "../../config/ormconfig";

interface IVacancyDelete {
    vacancy_id: string;
}

class DeleteVacancyService {
    async execute({ vacancy_id }: IVacancyDelete) {
        
        const vacancyRepository = connectionSource.getRepository(Vacancy);

        if (!vacancy_id) {
            throw new Error("Invalid data");
        }

        const vacancyAlreadyExists = await vacancyRepository.findOne({
            where: { vacancy_id },
        });

        if (!vacancyAlreadyExists) {
            throw new Error("Vaga não existe");
        }

        return await vacancyRepository.delete(vacancy_id)
            .then(f => {
                console.log(f);
                var messageDelete = {
                    message: "Registro excluido com sucesso"
                }

                return messageDelete;

            }, err => {
                throw new Error("Erro na exclusão");
            });
    }
}

export { DeleteVacancyService };