import { Skill } from "../../entities/Skill";
import { connectionSource } from "../../config/ormconfig";

interface ISkillRequest {
    text: string;
}

class CreateSkillService {
    async execute({ text }: ISkillRequest) {
        const skillRepository = connectionSource.getRepository(Skill);

        if (!text) {
            throw new Error("Invalid data");
        }

        const skillAlreadyExists = await skillRepository.findOne({
            where: { text },
        });

        if (skillAlreadyExists) {
            throw new Error("Habilidade já existe");
        }

        const skill = skillRepository.create({
            text,
        });

        await skillRepository.save(skill);

        return skill;
    }
}
export { CreateSkillService };