import { getCustomRepository } from "typeorm";
import { connectionSource } from "../../config/ormconfig";
import { Match } from "../../entities/Match";
import { instanceToPlain } from "class-transformer";

class ListMatchService {
  async execute() {
    const matchRepository = connectionSource.getRepository(Match);
    
    const matches = await matchRepository.find({relations: ["Candidate", "Vacancy"]});

    return instanceToPlain(matches);
  }
}

export { ListMatchService };
