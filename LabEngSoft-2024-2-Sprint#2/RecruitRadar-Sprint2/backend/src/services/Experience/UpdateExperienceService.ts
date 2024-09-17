import { Experience } from "../../entities/Experience";
import { connectionSource } from "../../config/ormconfig";

interface IExperienceRequest {
    experience_id: string;
    title: string;
}

class UpdateExperienceService {
    async execute({experience_id, title }: IExperienceRequest) {
        
        const experienceRepository = connectionSource.getRepository(Experience);

        if (!title) {
            throw new Error("Invalid data");
        }

        const experienceAlreadyExists = await experienceRepository.findOne({
            where: { experience_id },
        });

        if (!experienceAlreadyExists) {
            throw new Error("Experiencia não existente");
        }

        experienceAlreadyExists.title = title? title : experienceAlreadyExists.title;
        experienceAlreadyExists.updated_at = new Date();

        return await experienceRepository.update(experience_id, experienceAlreadyExists).then(f => {
            var messageDelete = {
                message: "Registro atualizado com sucesso"
            }

            return messageDelete;

        }, err => {
            throw new Error("Erro na atualização");
        });

    }
}

export { UpdateExperienceService };