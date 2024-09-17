import { instanceToPlain } from "class-transformer";
import { VacancyLanguage } from "../../entities/VacancyLanguage";
import { connectionSource } from "../../config/ormconfig";

class ListVacancyLanguageService {
  async execute() {

    const vacancyLanguageRepository = connectionSource.getRepository(VacancyLanguage);

    const vacancyLanguage = await vacancyLanguageRepository.find({relations: ["Vacancy", "Language"]});

    return instanceToPlain(vacancyLanguage);
    
  }
}

export { ListVacancyLanguageService };