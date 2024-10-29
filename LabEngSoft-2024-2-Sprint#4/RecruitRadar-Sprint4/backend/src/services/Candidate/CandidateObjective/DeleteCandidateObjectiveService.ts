import { connectionSource } from "../../../config/ormconfig";
import { CandidateObjective } from "../../../entities/CandidateObjective";

interface ICandidateObjectiveDelete {
    candidate_objective_id: string;
}

class DeleteCandidateObjective {
    async execute({ candidate_objective_id }: ICandidateObjectiveDelete) {
        
        const candidateObjectiveRepository = connectionSource.getRepository(CandidateObjective);

        if (!candidate_objective_id) {
            throw new Error("Invalid data");
        }

        const candidateObjectiveAlreadyExists = await candidateObjectiveRepository.findOne({
            where: { candidate_objective_id },
        });

        if (!candidateObjectiveAlreadyExists) {
            throw new Error("O Objetivo de Candidato não existe");
        }

        return await candidateObjectiveRepository.delete(candidate_objective_id)
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

export { DeleteCandidateObjective };
