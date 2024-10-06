import { instanceToPlain } from "class-transformer";
import { connectionSource } from "../../../config/ormconfig";
import { CandidateExperience } from "../../../entities/CandidateExperience";


class ListCandidateExperiencesService {
    async execute() {
        const candidateExperiencesRepository = connectionSource.getRepository(CandidateExperience);

        const candidateExperiece = await candidateExperiencesRepository.find({relations: ["Candidate","Experience"]});   

        return instanceToPlain(candidateExperiece);
    }
}

export { ListCandidateExperiencesService };
