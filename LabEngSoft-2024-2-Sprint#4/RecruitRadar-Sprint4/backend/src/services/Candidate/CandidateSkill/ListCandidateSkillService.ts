import { instanceToPlain } from "class-transformer";
import { connectionSource } from "../../../config/ormconfig";
import { CandidateSkill } from "../../../entities/CandidateSkill";

class ListCandidateSkillService {
    async execute() {

        const candidateSkillRepository = connectionSource.getRepository(CandidateSkill);

        const candidateSkills = await candidateSkillRepository.find({relations: ["Candidate", "Skill"]});

        return instanceToPlain(candidateSkills);
    
}
}   

export { ListCandidateSkillService };
