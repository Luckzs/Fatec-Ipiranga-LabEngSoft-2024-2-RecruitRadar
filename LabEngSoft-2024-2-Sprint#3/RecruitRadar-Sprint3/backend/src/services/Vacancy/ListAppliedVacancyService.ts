import { instanceToPlain } from "class-transformer";
import { Vacancy } from "../../entities/Vacancy";
import { connectionSource } from "../../config/ormconfig";

class ListAppliedVacancyService {
  async execute(email: string) {

    const vacancyRepository = connectionSource.getRepository(Vacancy);

    const vacancies = await vacancyRepository
      .createQueryBuilder('vacancy')
      .leftJoinAndSelect('vacancy.vacancyExperience', 'vacancyExperience')
      .leftJoinAndSelect('vacancyExperience.Experience', 'Experience')
      .leftJoinAndSelect('vacancy.vacancyLanguage', 'vacancyLanguage')
      .leftJoinAndSelect('vacancyLanguage.Language', 'Language')
      .leftJoinAndSelect('vacancy.vacancySkill', 'vacancySkill')
      .leftJoinAndSelect('vacancySkill.Skill', 'Skill')
      .leftJoinAndSelect('vacancy.vacancyStudy', 'vacancyStudy')
      .leftJoinAndSelect('vacancyStudy.Study', 'Study')
      .leftJoinAndSelect('vacancy.Match', 'Match')
      .leftJoinAndSelect('Match.Candidate', 'Candidate')
      .leftJoinAndSelect('Candidate.User', 'User')
      .where ( 'Match.applied = true AND User.email = :email', { email: email })
      .select([
        'vacancy.vacancy_id',
        'vacancy.created_at',
        'vacancy.title',
        'vacancy.company_name',
        'vacancy.description',
        'vacancy.salary',
        'vacancy.salary_max',
        'vacancy.city',
        'vacancy.state',
        'vacancy.work_model',
        'vacancy.webid',
        'vacancy.url',
        'vacancy.pcd',
        'vacancy.logo',
        'vacancy.contract_type',
        'vacancy.contract_period',
        'vacancyExperience.vacancy_experience_id',
        'vacancyExperience.period',
        'Experience.experience_id',
        'Experience.title',
        'vacancyLanguage.vacancy_language_id',
        'vacancyLanguage.level',
        'Language.language_id',
        'Language.course_name',
        'vacancySkill.vacancy_skill_id',
        'vacancySkill.skill_id',
        'Skill.text',
        'vacancyStudy.vacancy_study_id',
        'vacancyStudy.situation',
        'Study.education',
        'Match.match_id',
        'Match.score',
        'Match.applied',
        'Match.updated_at',
      ]).take(10)
        .getMany();

      console.log(vacancies);

    return instanceToPlain(vacancies);
  }
}

export { ListAppliedVacancyService };