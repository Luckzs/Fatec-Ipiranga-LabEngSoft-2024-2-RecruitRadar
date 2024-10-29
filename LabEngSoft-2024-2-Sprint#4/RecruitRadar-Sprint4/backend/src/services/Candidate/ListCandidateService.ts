import { instanceToPlain } from 'class-transformer';

import { connectionSource } from '../../config/ormconfig';
import { Candidate } from '../../entities/Candidate';

class ListCandidateService {
  async execute() {

    const candidateRepositories  = connectionSource.getRepository(Candidate);

    const candidate = await candidateRepositories.find({relations: ["User","candidateExperiences","candidateObjectives","candidateLanguages","candidateSkills","candidateStudies"]});

    return instanceToPlain(candidate);
  }
}

export { ListCandidateService };