import { instanceToPlain } from "class-transformer";

import { connectionSource } from "../../config/ormconfig";
import { Candidate } from "../../entities/Candidate";

class ListCandidateService {
  async execute() {
    const candidateRepositories = connectionSource.getRepository(Candidate);

    //const candidate = await candidateRepositories.find({relations: ["User","candidateExperiences","candidateObjectives","candidateLanguages","candidateSkills","candidateStudies"]});

    const candidate = await candidateRepositories
      .createQueryBuilder("candidate")
      .leftJoinAndSelect("candidate.User", "User")
      .leftJoinAndSelect(
        "candidate.candidateExperiences",
        "candidateExperiences"
      )
      .leftJoinAndSelect("candidateExperiences.Experience", "Experience")
      .leftJoinAndSelect("candidate.candidateObjectives", "candidateObjectives")
      .leftJoinAndSelect("candidate.candidateLanguages", "candidateLanguages")
      .leftJoinAndSelect("candidateLanguages.Language", "Language")
      .leftJoinAndSelect("candidate.candidateSkills", "candidateSkills")
      .leftJoinAndSelect("candidateSkills.Skill", "Skill")
      .leftJoinAndSelect("candidate.candidateStudies", "candidateStudies")
      .leftJoinAndSelect("candidateStudies.Study", "Study")
      .select([
        "candidate",
        "candidateExperiences",
        "Experience",
        "candidateObjectives",
        "candidateLanguages",
        "Language",
        "candidateSkills",
        "Skill",
        "candidateStudies",
        "Study",
        "User.user_id",
        "User.name",
      ]) // Seleciona tudo do candidate, mas somente as colunas específicas do User
      .getMany();

    return instanceToPlain(candidate);
  }
}

export { ListCandidateService };
