import { connectionSource } from "../../../config/ormconfig";
import { CandidateLanguage } from "../../../entities/CandidateLanguage";

interface ICandidateLanguageDelete {
    candidate_language_id: string;
}

class DeleteCandidateLanguage {
    async execute({ candidate_language_id }: ICandidateLanguageDelete) {
        
        const candidateLanguageRepository = connectionSource.getRepository(CandidateLanguage);

        if (!candidate_language_id) {
            throw new Error("Invalid data");
        }

        const candidateLanguageAlreadyExists = await candidateLanguageRepository.findOne({
            where: { candidate_language_id },
        });

        if (!candidateLanguageAlreadyExists) {
            throw new Error("O Idioma de Candidato não existe");
        }

        return await candidateLanguageRepository.delete(candidate_language_id)
            .then(f => {
                console.log(f);
                var messageDelete = {
                    message: "Registro excluido com sucesso"
                }

                return messageDelete;

            }, err => {
                throw new Error("Erro na exclusão");
            });
    }
}

export { DeleteCandidateLanguage };
