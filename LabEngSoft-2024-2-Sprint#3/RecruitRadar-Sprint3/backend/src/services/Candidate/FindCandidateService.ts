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
      .select([
        'candidate.candidate_id',
        'candidate.full_name',
        'candidate.distance_radius',
        'candidate.CPF',
        'candidate.pcd',
        'candidate.sex',
        'candidate.birth_date',
        'candidate.address',
        'candidate.postal_code',
        'candidateExperiences.candidate_experience_id',
        'candidateExperiences.company_name',
        'candidateExperiences.start_date',
        'candidateExperiences.end_date',
        'candidateExperiences.period',
        'experience.experience_id',
        'experience.title',
        'candidateLanguages.candidate_language_id',
        'candidateLanguages.level',
        'language.language_id',
        'language.course_name',
        'candidateObjectives.candidate_objective_id',
        'candidateObjectives.job',
        'candidateObjectives.work_model',
        'candidateObjectives.salary_expectation',
        'candidateSkills.candidate_skill_id',
        'candidateSkills.skill_id',
        'skill.text',
        'candidateStudies.candidate_study_id',
        'candidateStudies.course_name',
        'candidateStudies.institution_name',
        'candidateStudies.situation',
        'candidateStudies.start_date',
        'candidateStudies.completion_date',
        'study.study_id',
        'study.education',
        'user.email',
        'user.user_id',
      ])
      .getOne();

    return instanceToPlain(candidate);
  }
}

export { FindCandidateService };