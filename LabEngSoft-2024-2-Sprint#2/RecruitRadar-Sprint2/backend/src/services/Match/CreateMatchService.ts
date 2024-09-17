import { Match } from "../../entities/Match";
import { connectionSource } from "../../config/ormconfig";

interface IMatchRequest {
    candidate_id: string;
    vacancy_id: string;
    score?: number;
}

class CreateMatchService {
    async execute({ candidate_id, vacancy_id,score }: IMatchRequest) {
        const matchRepository = connectionSource.getRepository(Match);

        if (!candidate_id || !vacancy_id) {
            throw new Error("Invalid data");
        }

        const matchAlreadyExists = await matchRepository.findOne({
            where: { candidate_id, vacancy_id },
        });

        if (matchAlreadyExists) {
            throw new Error("Match already exists");
        }

        const match = matchRepository.create({
            candidate_id,
            vacancy_id,
            score
        });

        await matchRepository.save(match);

        return match;

    }
}

export { CreateMatchService };