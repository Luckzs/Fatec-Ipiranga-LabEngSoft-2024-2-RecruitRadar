import { Match } from "../../entities/Match";
import { connectionSource } from "../../config/ormconfig";

interface IMatchRequest {
    match_id: string;
    candidate_id: string;
    vacancy_id: string;
    score?: number;
}

class UpdateMatchService {
    async execute({ match_id, candidate_id, vacancy_id, score }: IMatchRequest) {
        const matchRepository = connectionSource.getRepository(Match);

        if (!match_id) {
            throw new Error("Invalid data");
        }

        const match = await matchRepository.findOne({
            where: { match_id },
        });

        if (!match) {
            throw new Error("Match não encontrado");
        }

        match.candidate_id = candidate_id? candidate_id : match.candidate_id;
        match.vacancy_id = vacancy_id? vacancy_id : match.vacancy_id;
        match.score = score? score : match.score;

        return await matchRepository.update(match_id, match)
                        .then(f => {
                            console.log(f);
                            var messageUpdate = {
                                message: "Registro atualizado com sucesso"
                            }

                            return messageUpdate;

                        }, err => {
                            throw new Error("Erro na atualização");
                        });
    }
}

export { UpdateMatchService };