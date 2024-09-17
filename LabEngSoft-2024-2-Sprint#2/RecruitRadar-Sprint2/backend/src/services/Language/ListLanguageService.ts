import { instanceToPlain } from "class-transformer";
import { Language } from "../../entities/Language";
import { connectionSource } from "../../config/ormconfig";

class ListLanguageService {
  async execute() {
    const languageRepository = connectionSource.getRepository(Language);

    const languages = await languageRepository.find();

    return instanceToPlain( languages);
  }
}

export { ListLanguageService };
