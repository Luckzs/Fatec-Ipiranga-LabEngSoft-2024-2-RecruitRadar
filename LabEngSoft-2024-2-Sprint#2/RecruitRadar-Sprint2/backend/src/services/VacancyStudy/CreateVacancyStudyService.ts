import { VacancyStudy } from "../../entities/VacancyStudy";
import { connectionSource } from "../../config/ormconfig";

interface IVacancyStudyRequest {
    vacancy_id: string;
    study_id: string;
    situation: string;
    start_date: Date;
    completion_date: Date;
}

class CreateVacancyStudyService {
    async execute({ vacancy_id, study_id,situation,start_date,completion_date }: IVacancyStudyRequest) {
        const vacancyStudyRepository = connectionSource.getRepository(VacancyStudy);

        if (!vacancy_id || !study_id) {
            throw new Error("Invalid data");
        }

        const vacancyStudyAlreadyExists = await vacancyStudyRepository.findOne({
            where: { vacancy_id, study_id },
        });

        if (vacancyStudyAlreadyExists) {
            throw new Error("Estudo de Vaga já existente");
        }

        const vacancyStudy = vacancyStudyRepository.create({
            vacancy_id,
            study_id,
            situation,
            start_date,
            completion_date
        });

        await vacancyStudyRepository.save(vacancyStudy);

        return vacancyStudy;
    }
}

export { CreateVacancyStudyService };