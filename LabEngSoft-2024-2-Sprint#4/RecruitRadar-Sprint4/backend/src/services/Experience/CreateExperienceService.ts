import { Experience } from "../../entities/Experience";
import { connectionSource } from "../../config/ormconfig";

interface IExperienceRequest {
    title: string;
}
class CreateExperienceService {
    async execute({ title }: IExperienceRequest) {
        
        const experienceRepository = connectionSource.getRepository(Experience);

        if (!title) {
            throw new Error("Invalid data");
        }

        const experienceAlreadyExists = await experienceRepository.findOne({
            where: { title },
        });

        if (experienceAlreadyExists) {
            throw new Error("Experiência já existe");
        }

        const experience = experienceRepository.create({
            title,
        });

        await experienceRepository.save(experience);

        return experience;
    }
}

export { CreateExperienceService };