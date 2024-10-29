import { connectionSource } from "../../../config/ormconfig";
import { Candidate } from "../../../entities/Candidate";
import { CandidateSkill } from "../../../entities/CandidateSkill";
import { Skill } from "../../../entities/Skill";

interface ICandidateSkillRequest {
    email: string;
    candidate_skill_id: string;
    text: string;
}

class UpdateCandidateSkillService {
    async execute(data: ICandidateSkillRequest) {
        if (!data) {
            throw new Error("Invalid data");
        }

        const { email,text,candidate_skill_id } = data;
        
        const candidateSkillRepository = connectionSource.getRepository(CandidateSkill);
        const skillRepository = connectionSource.getRepository(Skill);
        const candidateRepository = connectionSource.getRepository(Candidate);

        let candidateSkill = await candidateSkillRepository.findOne({
            where: { candidate_skill_id },
            relations: ["Skill"],
        });

        if (!candidateSkill) {

            let candidate = await candidateRepository.findOne({
                where: { User: { email } },
                relations: ["User"],
            });

            if (!candidate) {
                throw new Error("Candidato não encontrado");
            }

            let skill = await skillRepository.findOne({
                where: { text: text },
            });

            if (!skill) {
                skill = skillRepository.create({
                    text: text,
                });
                await skillRepository.save(skill);
            }

            candidateSkill = candidateSkillRepository.create({
                Candidate: candidate,
                Skill: skill,
            });
            await candidateSkillRepository.save(candidateSkill);
            return {message: "Nova Habilidade do Candidato criada com sucesso"};
        }

        const skillToUpdate = candidateSkill.Skill;

        if(skillToUpdate.text !== text){
            let newSkill = await skillRepository.findOne({
                where: { text: text },
            });

            if (!newSkill) {
                newSkill = skillRepository.create({
                    text: text,
                });
                await skillRepository.save(newSkill);
            }

            candidateSkill.Skill = newSkill;
        }
        candidateSkill.updated_at = new Date();

        await candidateSkillRepository.save(candidateSkill);

        return { message: "Habilidade do Candidato atualizada com sucesso" };
        
    }
}
export { UpdateCandidateSkillService };
