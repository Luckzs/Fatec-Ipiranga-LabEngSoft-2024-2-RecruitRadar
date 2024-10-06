import { Language } from "../../entities/Language";
import { connectionSource } from "../../config/ormconfig";

interface ILanguageDelete {
    language_id: string;
}

class DeleteLanguageService {
    async execute({ language_id }: ILanguageDelete) {
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

        return await languageRepository.delete(language_id)
            .then(f => {
                console.log(f);
                var messagmsgeDelete = {
                    message: "Registro Excluido com Sucesso"
                }

                return messagmsgeDelete;

            }, err => {
                throw new Error("Error na Exclusão");
            });
    }
}

export { DeleteLanguageService };