import { VacancyStudy } from "../../entities/VacancyStudy";
import { connectionSource } from "../../config/ormconfig";

interface IVacancyStudyDelete  {
    vacancy_study_id: string;
}

class DeleteVacancyStudyService {
    async execute({ vacancy_study_id }: IVacancyStudyDelete) {
        const vacancyStudyRepository = connectionSource.getRepository(VacancyStudy);

        if (!vacancy_study_id) {
            throw new Error("Invalid data");
        }

        const vacancyStudy = await vacancyStudyRepository.findOne({
            where: { vacancy_study_id},
        });

        if (!vacancyStudy) {
            throw new Error("Estudo Vaga não encontrado");
        }

        return await vacancyStudyRepository.delete(vacancy_study_id).then(f => {
            console.log(f);
            var messageDelete = {
                message: "Registro deletado com sucesso"
            }

            return messageDelete;

        }
        , err => {
            throw new Error("Erro na deleção");
        }
    );
    }
}

export { DeleteVacancyStudyService };
