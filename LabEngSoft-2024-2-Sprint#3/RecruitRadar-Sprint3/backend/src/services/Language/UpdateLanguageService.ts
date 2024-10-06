import { Language } from "../../entities/Language";
import { connectionSource } from "../../config/ormconfig";

interface ILanguageRequest {
    language_id: string;
    course_name: string;
}

class UpdateLanguageService {
    async execute({ language_id, course_name }: ILanguageRequest) {
        const languageRepository = connectionSource.getRepository(Language);

        if (!language_id) {
            throw new Error("Invalid data");
        }

        const languageAlreadyExists = await languageRepository.findOne({
            where: {
                language_id,
            },
        });

        if (!languageAlreadyExists) {
            throw new Error("Linguagem não existe");
        }

        languageAlreadyExists.course_name = course_name ? course_name : languageAlreadyExists.course_name;
        languageAlreadyExists.updated_at = new Date();

        return await languageRepository.update(language_id, languageAlreadyExists)
            .then(f => {
                var messageDelete = {
                    message: "Registro atualizado com sucesso"
                }

                return messageDelete;

            }, err => {
                throw new Error("Erro na atualização");
            });
    }
}

export { UpdateLanguageService };
