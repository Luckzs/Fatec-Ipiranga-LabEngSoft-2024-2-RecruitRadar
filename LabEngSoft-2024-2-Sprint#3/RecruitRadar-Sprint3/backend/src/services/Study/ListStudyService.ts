import { Study } from "../../entities/Study";
import { connectionSource } from "../../config/ormconfig";
import { instanceToPlain } from "class-transformer";

class ListStudyService {
  async execute() {
    const studyRepository = connectionSource.getRepository(Study);

    const studies = await studyRepository.find();

    return instanceToPlain(studies);
  }
}

export { ListStudyService };