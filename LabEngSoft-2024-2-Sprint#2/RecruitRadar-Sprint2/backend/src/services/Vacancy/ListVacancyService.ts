import { instanceToPlain } from "class-transformer";
import { Vacancy } from "../../entities/Vacancy";
import { connectionSource } from "../../config/ormconfig";

class ListVacancyService {
  async execute() {

    const vacancyRepository = connectionSource.getRepository(Vacancy);

    const vacancies = await vacancyRepository.find({relations: [
      "vacancyExperience",
      "vacancyExperience.Experience",
      "vacancyLanguage",
      "vacancyLanguage.Language",
      "vacancySkill",
      "vacancySkill.Skill",
      "vacancyStudy",
      "vacancyStudy.Study"
    ]});
    
    return instanceToPlain(vacancies);
  }
}

export { ListVacancyService };