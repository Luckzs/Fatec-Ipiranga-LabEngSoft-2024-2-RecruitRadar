import { Match } from "../../entities/Match";
import { connectionSource } from "../../config/ormconfig";

interface IMatchDelete {
    match_id: string;
}

class DeleteMatchService {
    async execute({ match_id }: IMatchDelete) {
        
        const matchRepository = connectionSource.getRepository(Match);

        if (!match_id) {
            throw new Error("Invalid data");
        }

        const matchAlreadyExists = await matchRepository.findOne({
            where: { match_id },
        });

        if (!matchAlreadyExists) {
            throw new Error("Match não existe");
        }

        return await matchRepository.delete(match_id)
            .then(f => {
                console.log(f);
                var messageDelete = {
                    message: "Registro excluido com sucesso"
                }

                return messageDelete;

            }, err => {
                throw new Error("Erro na exclusão");
            });
    }
}

export { DeleteMatchService };