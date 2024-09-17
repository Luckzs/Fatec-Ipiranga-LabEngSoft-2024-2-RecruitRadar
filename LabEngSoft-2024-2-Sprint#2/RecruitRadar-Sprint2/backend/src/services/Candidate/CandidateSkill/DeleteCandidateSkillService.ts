import { connectionSource } from "../../../config/ormconfig";
import { CandidateSkill } from "../../../entities/CandidateSkill";

interface ICandidateSkillDelete {
    candidate_skill_id: string;
}

class DeleteCandidateSkillService {
    async execute({ candidate_skill_id }: ICandidateSkillDelete) {
        const candidateSkillRepository = connectionSource.getRepository(CandidateSkill);

        if (!candidate_skill_id) {
            throw new Error("Invalid data");
        }

        const candidateSkillAlreadyExists = await candidateSkillRepository.findOne({
            where: {
                candidate_skill_id,
            },
        });

        if (!candidateSkillAlreadyExists) {
            throw new Error("Habilidade do candidato não existe");
        }

        return await candidateSkillRepository.delete(candidate_skill_id)
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

export { DeleteCandidateSkillService };
