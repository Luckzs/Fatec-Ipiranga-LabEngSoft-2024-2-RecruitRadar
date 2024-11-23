import { connectionSource } from "../../../config/ormconfig";
import { CandidateStudy } from "../../../entities/CandidateStudy";

interface ICandidateStudyDelete {
    candidate_study_id: string;
}

class DeleteCandidateStudy {
    async execute({ candidate_study_id }: ICandidateStudyDelete) {
        
        const candidateStudyRepository = connectionSource.getRepository(CandidateStudy);

        if (!candidate_study_id) {
            throw new Error("Invalid data");
        }

        const candidateStudyAlreadyExists = await candidateStudyRepository.findOne({
            where: { candidate_study_id },
        });

        if (!candidateStudyAlreadyExists) {
            throw new Error("O Estudo de Candidato não existe");
        }

        return await candidateStudyRepository.delete(candidate_study_id)
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

export { DeleteCandidateStudy };
