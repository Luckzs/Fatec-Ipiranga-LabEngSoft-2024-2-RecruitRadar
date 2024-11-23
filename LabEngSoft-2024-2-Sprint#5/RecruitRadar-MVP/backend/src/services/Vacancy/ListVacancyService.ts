import { instanceToPlain } from "class-transformer";
import { Vacancy } from "../../entities/Vacancy";
import { connectionSource } from "../../config/ormconfig";

class ListVacancyService {
  async execute() {

    const vacancyRepository = connectionSource.getRepository(Vacancy);

    /*const vacancies = await vacancyRepository.find({relations: [
      "vacancyExperience",
      "vacancyExperience.Experience",
      "vacancyLanguage",
      "vacancyLanguage.Language",
      "vacancySkill",
      "vacancySkill.Skill",
      "vacancyStudy",
      "vacancyStudy.Study"
    ]});*/

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
        'Match.score'
      ]).getMany();

      

    return instanceToPlain(vacancies);
  }
}

export { ListVacancyService };