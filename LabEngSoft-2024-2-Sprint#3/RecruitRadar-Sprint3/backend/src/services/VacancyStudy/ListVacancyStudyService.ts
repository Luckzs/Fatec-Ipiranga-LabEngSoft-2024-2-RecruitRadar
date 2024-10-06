import { getCustomRepository } from "typeorm";
import { connectionSource } from "../../config/ormconfig";
import { VacancyStudy } from "../../entities/VacancyStudy";
import { instanceToPlain } from "class-transformer";

class ListVacancyStudyService {
  public async execute() {
    
    const vacancyStudyRepository = connectionSource.getRepository(VacancyStudy);

    const vacancyStudy = await vacancyStudyRepository.find({ relations: ["Vacancy", "Study"] });

    return instanceToPlain(vacancyStudy);
  }
}

export { ListVacancyStudyService };