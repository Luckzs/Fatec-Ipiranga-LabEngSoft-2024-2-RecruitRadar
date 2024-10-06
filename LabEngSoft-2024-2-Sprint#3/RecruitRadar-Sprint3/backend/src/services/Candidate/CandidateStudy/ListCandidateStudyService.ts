import { instanceToPlain } from "class-transformer";
import { connectionSource } from "../../../config/ormconfig";
import { CandidateStudy } from "../../../entities/CandidateStudy";

class ListCandidateStudyService {
  async execute() {
    const candidateStudyRepository = connectionSource.getRepository	(CandidateStudy);

    const candidateStudy = await candidateStudyRepository.find({relations: ["Candidate", "Study"]});

    return instanceToPlain(candidateStudy);
  }
}

export { ListCandidateStudyService };
