import { instanceToPlain } from "class-transformer";
import { Vacancy } from "../../entities/Vacancy";
import { connectionSource } from "../../config/ormconfig";

class ListUnappliedVacancyService {
  async execute(email: string, candidateLatitude: number, candidateLongitude: number,professional_area: string, maxDistance: number) {
    const vacancyRepository = connectionSource.getRepository(Vacancy);

    // Construção da subquery para selecionar IDs de vagas com match do candidato específico
    const matchedVacancies = vacancyRepository
      .createQueryBuilder("vacancy")
      .select("m.vacancy_id")
      .from("Match", "m")
      .innerJoin("m.Candidate", "c")
      .innerJoin("c.User", "u")
      .where("u.email = :email", { email });

      const vacancies = await vacancyRepository
      .createQueryBuilder("vacancy")
      .leftJoinAndSelect("vacancy.vacancyExperience", "vacancyExperience")
      .leftJoinAndSelect("vacancyExperience.Experience", "Experience")
      .leftJoinAndSelect("vacancy.vacancyLanguage", "vacancyLanguage")
      .leftJoinAndSelect("vacancyLanguage.Language", "Language")
      .leftJoinAndSelect("vacancy.vacancySkill", "vacancySkill")
      .leftJoinAndSelect("vacancySkill.Skill", "Skill")
      .leftJoinAndSelect("vacancy.vacancyStudy", "vacancyStudy")
      .leftJoinAndSelect("vacancyStudy.Study", "Study")
      .where(`vacancy.vacancy_id NOT IN (${matchedVacancies.getQuery()})`)
      .andWhere(
        `ST_Distance(
          vacancy.position,
          ST_SetSRID(ST_MakePoint(:candidateLongitude, :candidateLatitude), 4326)
        ) <= :maxDistance`
      )
      .addSelect(
        `ST_Distance(
          vacancy.position,
          ST_SetSRID(ST_MakePoint(:candidateLongitude, :candidateLatitude), 4326)
        )`,
        "distance"
      )
      .orderBy("distance", "ASC")
      .setParameters({
        email,
        candidateLatitude,
        candidateLongitude,
        maxDistance, 
        professional_area,
      })
      .getMany();

    return instanceToPlain(vacancies);
  }
}

export { ListUnappliedVacancyService };
