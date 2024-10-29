import { Match } from "../../entities/Match";
import { connectionSource } from "../../config/ormconfig";

interface IMatchRequest {
    candidate_id: string;
    vacancy_id: string;
    score?: number;
    applied?: boolean;
}

class CreateMatchService {
    async execute({ candidate_id, vacancy_id,score,applied }: IMatchRequest) {
        const matchRepository = connectionSource.getRepository(Match);

        if (!candidate_id || !vacancy_id) {
            throw new Error("Invalid data");
        }

        const matchAlreadyExists = await matchRepository.findOne({
            where: {
                candidate_id: candidate_id,
                vacancy_id: vacancy_id,
            },
        });

        if (matchAlreadyExists) {
            throw new Error("Match already exists");
        }

        const match = matchRepository.create({
            candidate_id,
            vacancy_id,
            score,
            applied
        });

        await matchRepository.save(match);

        return match;

    }
}

export { CreateMatchService };