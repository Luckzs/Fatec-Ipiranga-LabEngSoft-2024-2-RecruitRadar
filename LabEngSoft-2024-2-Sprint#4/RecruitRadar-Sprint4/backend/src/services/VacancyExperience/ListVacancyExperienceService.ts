import { instanceToPlain } from "class-transformer";
import { VacancyExperience } from "../../entities/VacancyExperience";
import { connectionSource } from "../../config/ormconfig";

class ListVacancyExperienceService {
  async execute() {
    const vacancyExperienceRepository = connectionSource.getRepository(VacancyExperience);
    
    const vacancyExperience = await vacancyExperienceRepository.find({relations: ["Vacancy", "Experience"]});

    return instanceToPlain(vacancyExperience);
  }
}

export { ListVacancyExperienceService };