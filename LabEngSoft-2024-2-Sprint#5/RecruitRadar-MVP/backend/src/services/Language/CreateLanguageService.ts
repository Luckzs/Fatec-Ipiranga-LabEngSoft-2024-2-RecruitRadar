import { Language } from "../../entities/Language";
import { connectionSource } from "../../config/ormconfig";

interface ILanguageRequest {
    course_name: string;
}

class CreateLanguageService {
    async execute({ course_name }: ILanguageRequest) {
        
        const languageRepository = connectionSource.getRepository(Language);

        if (!course_name) {
            throw new Error("Invalid data");
        }

        const languageAlreadyExists = await languageRepository.findOne({
            where: { course_name },
        });

        if (languageAlreadyExists) {
            throw new Error("Linguagem já existente");
        }

        const language = languageRepository.create({
            course_name,
        });

        await languageRepository.save(language);

        return language;
    }
}

export { CreateLanguageService };