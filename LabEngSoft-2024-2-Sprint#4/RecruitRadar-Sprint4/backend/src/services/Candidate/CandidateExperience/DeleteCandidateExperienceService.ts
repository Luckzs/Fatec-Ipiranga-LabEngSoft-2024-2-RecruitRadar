import { connectionSource } from "../../../config/ormconfig";
import { CandidateExperience } from "../../../entities/CandidateExperience";

interface ICandidateExperienceDelete {
    candidate_experience_id: string;
}

class DeleteCandidateExperienceService {
    async execute({ candidate_experience_id }: ICandidateExperienceDelete) {
        
        const candidateExperienceRepository = connectionSource.getRepository(CandidateExperience);

        if (!candidate_experience_id) {
            throw new Error("Invalid data");
        }

        const candidateExperience = await candidateExperienceRepository.findOne({
            where: { candidate_experience_id },
        });

        if (!candidateExperience) {
            throw new Error("Experiência de Candidato não encontrada");
        }

        return await candidateExperienceRepository.delete(candidate_experience_id).then(f => {
            console.log(f);
            var messageDelete = {
                message: "Registro excluido com sucesso"
            }

            return messageDelete;

        }, err => {
            throw new Error("Erro na exclusão");
        }
        );
    }
}

export { DeleteCandidateExperienceService };
