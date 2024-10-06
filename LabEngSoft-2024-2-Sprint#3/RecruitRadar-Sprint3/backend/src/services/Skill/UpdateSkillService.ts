import { Skill } from "../../entities/Skill";
import { connectionSource } from "../../config/ormconfig";

interface ISkillRequest {
    skill_id: string;
    text: string;
}

class UpdateSkillService {
    async execute({ skill_id, text }: ISkillRequest) {
        const skillsRepository = connectionSource.getRepository(Skill);

        const skillAlreadyExists = await skillsRepository.findOne({
            where: {
                skill_id,
            },
        });

        if (!skillAlreadyExists) {
            throw new Error("Habilidade não existe");
        }

        skillAlreadyExists.text = text ? text : skillAlreadyExists.text;
        skillAlreadyExists.updated_at = new Date();

        return await skillsRepository.update(skill_id, skillAlreadyExists)
            .then(f => {
                console.log(f);
                var messagmsgeDelete = {
                    message: "Registro atualizado com sucesso"
                }

                return messagmsgeDelete;

            }, err => {
                throw new Error("Erro na atualização");
            });
    }
}

export { UpdateSkillService };