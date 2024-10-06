import { Study } from "../../entities/Study";
import { connectionSource } from "../../config/ormconfig";

interface IStudyDelete {
    study_id: string;
}

class DeleteStudyService {
    async execute({ study_id }: IStudyDelete) {
        const studyRepository = connectionSource.getRepository(Study);

        if (!study_id) {
            throw new Error("Invalid data");
        }

        const studyAlreadyExists = await studyRepository.findOne({
            where: { study_id },
        });

        if (!studyAlreadyExists) {
            throw new Error("Estudo não existe");
        }

        return await studyRepository.delete(study_id)
            .then(f => {
                console.log(f);
                var messagmsgeDelete = {
                    message: "Registro excluido com sucesso"
                }

                return messagmsgeDelete;

            }, err => {
                throw new Error("Erro na exclusão");
            });
    }
}

export { DeleteStudyService };