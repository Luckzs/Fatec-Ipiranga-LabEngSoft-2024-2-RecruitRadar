import { Skill } from "../../entities/Skill";
import { connectionSource } from "../../config/ormconfig";
import { classToPlain, instanceToPlain } from "class-transformer";

class ListSkillService {
  async execute() {
    const skillsRepository = connectionSource.getRepository(Skill);

    const skills = await skillsRepository.find();

    return instanceToPlain(skills);
  }
}

export { ListSkillService };