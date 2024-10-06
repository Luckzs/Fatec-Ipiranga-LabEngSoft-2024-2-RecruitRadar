import { instanceToPlain } from "class-transformer";
import { connectionSource } from "../../../config/ormconfig";
import { CandidateObjective } from "../../../entities/CandidateObjective";

class ListCandidateObjective {
  async execute() {
    const candidateObjectiveRepository = connectionSource.getRepository(CandidateObjective);

    const candidateObjective = await candidateObjectiveRepository.find({relations: ["Candidate"]});

    return instanceToPlain(candidateObjective);
  }
}

export { ListCandidateObjective };
