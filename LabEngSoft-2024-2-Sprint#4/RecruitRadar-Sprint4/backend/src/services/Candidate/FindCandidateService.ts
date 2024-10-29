import { instanceToPlain } from 'class-transformer';

import { connectionSource } from '../../config/ormconfig';
import { Candidate } from '../../entities/Candidate';

interface ICandidateFindOne {
  email: string;
}

class FindCandidateService {
  async execute({ email }: ICandidateFindOne) {

    const candidateRepositories = connectionSource.getRepository(Candidate);

    if (!email) {
      throw new Error("Invalid data");
    }

    const candidate = await candidateRepositories
      .createQueryBuilder('candidate')
      .leftJoinAndSelect('candidate.User', 'user')
      .leftJoinAndSelect('candidate.candidateExperiences', 'candidateExperiences')
      .leftJoinAndSelect('candidateExperiences.Experience', 'experience')
      .leftJoinAndSelect('candidate.candidateLanguages', 'candidateLanguages')
      .leftJoinAndSelect('candidateLanguages.Language', 'language')
      .leftJoinAndSelect('candidate.candidateObjectives', 'candidateObjectives')
      .leftJoinAndSelect('candidate.candidateSkills', 'candidateSkills')
      .leftJoinAndSelect('candidateSkills.Skill', 'skill')
      .leftJoinAndSelect('candidate.candidateStudies', 'candidateStudies')
      .leftJoinAndSelect('candidateStudies.Study', 'study')
      .where('user.email = :email', { email })
      .select('candidate')  // Seleciona todas as colunas da tabela candidate
      .addSelect([
        'candidateExperiences',  // Inclui candidateExperiences
        'experience',  // Inclui experience
        'candidateLanguages',  // Inclui candidateLanguages
        'language',  // Inclui language
        'candidateObjectives',  // Inclui candidateObjectives
        'candidateSkills',  // Inclui candidateSkills
        'skill',  // Inclui skill
        'candidateStudies',  // Inclui candidateStudies
        'study',  // Inclui study
        'user'  // Inclui user  
        ])
      .getOne();

    return instanceToPlain(candidate);
  }
}

export { FindCandidateService };