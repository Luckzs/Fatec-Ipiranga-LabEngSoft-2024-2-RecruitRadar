import { Experience } from "../../entities/Experience";
import { connectionSource } from "../../config/ormconfig";

interface IExperienceDelete {
    experience_id: string;
}

class DeleteExperienceService {

    async execute({ experience_id }: IExperienceDelete) {


        const experienceRepository = connectionSource.getRepository(Experience);

        if (!experience_id) {
            throw new Error("Invalid data");
        }

        const experienceAlreadyExists = await experienceRepository.findOne({
            where: {
                experience_id,
            },
        });

        if (!experienceAlreadyExists) {
            throw new Error("Experiencia não encontrada");
        }

        return await experienceRepository.delete(experience_id)
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

export { DeleteExperienceService };
