import { instanceToPlain } from "class-transformer";
import { Vacancy } from "../../entities/Vacancy";
import { connectionSource } from "../../config/ormconfig";

class ListProfessionalAreasFromVacancies {
  async execute() {
    const vacancyRepository = connectionSource.getRepository(Vacancy);

    // Construção da query principal para obter vagas não aplicadas pelo candidato
    const vacancies = await vacancyRepository
      .createQueryBuilder("vacancy")
      .leftJoinAndSelect('vacancy.vacancyExperience', 'vacancyExperience')
      .leftJoinAndSelect('vacancyExperience.Experience', 'Experience')
      .select("vacancy.professional_area")
      .where("vacancy.professional_area IS NOT NULL")
      .distinct(true)
      .getRawMany();

          // Transforma o array de objetos em um array de strings
    const professionalAreas = vacancies.map(
      (vacancy) => vacancy.vacancy_professional_area
    );

    return instanceToPlain(professionalAreas);
  }
}

export { ListProfessionalAreasFromVacancies };
