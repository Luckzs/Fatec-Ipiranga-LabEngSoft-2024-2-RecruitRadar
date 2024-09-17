import { VacancyStudy } from "../../entities/VacancyStudy";
import { connectionSource } from "../../config/ormconfig";

interface IVacancyStudyRequest {
    vacancy_study_id: string;
    vacancy_id: string;
    study_id: string;
    situation: string;
    start_date: Date;
    completion_date: Date;
}

class UpdateVacancyStudyService {
    async execute({ vacancy_study_id, vacancy_id, study_id, situation, start_date, completion_date }: IVacancyStudyRequest) {   
        const vacancyStudyRepository = connectionSource.getRepository(VacancyStudy);

        if (!vacancy_study_id) {
            throw new Error("Invalid data");
        }

        const vacancyStudyAlreadyExists = await vacancyStudyRepository.findOne({
            where: { vacancy_study_id },
        });

        if (!vacancyStudyAlreadyExists) {
            throw new Error("Estudo de Vaga não existe");
        }

        vacancyStudyAlreadyExists.situation = situation ? situation : vacancyStudyAlreadyExists.situation;
        vacancyStudyAlreadyExists.start_date = start_date ? start_date : vacancyStudyAlreadyExists.start_date;
        vacancyStudyAlreadyExists.completion_date = completion_date ? completion_date : vacancyStudyAlreadyExists.completion_date;
        vacancyStudyAlreadyExists.vacancy_id = vacancy_id ? vacancy_id : vacancyStudyAlreadyExists.vacancy_id;
        vacancyStudyAlreadyExists.study_id = study_id ? study_id : vacancyStudyAlreadyExists.study_id
        vacancyStudyAlreadyExists.updated_at = new Date();

        return await vacancyStudyRepository.update(vacancy_study_id, vacancyStudyAlreadyExists).then(f => {
            console.log(f);
            var messageDelete = {
                message: "Registro atualizado com sucesso"
            }

            return messageDelete;

        }, err => {
            throw new Error("Erro na atualização");
        });
    }

}

export { UpdateVacancyStudyService };