import { connectionSource } from "../../../config/ormconfig";
import { Candidate } from "../../../entities/Candidate";
import { CandidateSkill } from "../../../entities/CandidateSkill";
import { Skill } from "../../../entities/Skill";

interface ICandidateSkillRequest {
    email: string;
    text: string;
}

class CreateCandidateSkillService {
    async execute(data: ICandidateSkillRequest) {
        
        if(!data) {
            throw new Error("Invalid data");
        }

        const { email, text } = data;

        const candidateRepository = connectionSource.getRepository(Candidate);

        const skillRepository = connectionSource.getRepository(Skill);

        const candidateSkillRepository = connectionSource.getRepository(CandidateSkill);

        const candidate = await candidateRepository.findOne({
            where: { User: { email } },
            relations: ["User"],
        });

        if (!candidate) {
            throw new Error("Candidato não encontrado");
        }

        let skill = await skillRepository.findOne({
            where: { text },
        });

        if (!skill) {
            skill = skillRepository.create({
                text,
            });

            await skillRepository.save(skill);
        }

        const candidateSkillAlreadyExists = await candidateSkillRepository.findOne({
            where: { candidate_id:candidate.candidate_id, skill_id: skill.skill_id },
        });

        if (candidateSkillAlreadyExists) {
            throw new Error("Habilidade de Candidato já existente");
        }

        const candidateSkill = candidateSkillRepository.create({
            candidate_id: candidate.candidate_id,
            skill_id: skill.skill_id,
        });

        await candidateSkillRepository.save(candidateSkill);

        return candidateSkill;
    }
}

export { CreateCandidateSkillService };
