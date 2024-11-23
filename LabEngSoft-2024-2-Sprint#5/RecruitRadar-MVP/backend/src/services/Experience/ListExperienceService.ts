import { instanceToPlain } from "class-transformer";
import { Experience } from "../../entities/Experience";
import { connectionSource } from "../../config/ormconfig";

class ListExperienceService {
  async execute() {

    const experiencesRepository = connectionSource.getRepository(Experience);
    
    const experiences = await experiencesRepository.find();

    return instanceToPlain(experiences);
  }
}

export { ListExperienceService };