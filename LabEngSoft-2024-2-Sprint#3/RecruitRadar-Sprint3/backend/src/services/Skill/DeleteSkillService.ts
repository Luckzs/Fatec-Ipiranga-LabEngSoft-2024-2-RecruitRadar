import { Skill } from "../../entities/Skill";
import { connectionSource } from "../../config/ormconfig";

interface ISkillDelete {
    skill_id: string;
}

class DeleteSkillService {
    async execute({ skill_id }: ISkillDelete) {
        const skillsRepository = connectionSource.getRepository(Skill);

        const skillAlreadyExists = await skillsRepository.findOne({
            where: {
                skill_id,
            },
        });

        if (!skillAlreadyExists) {
            throw new Error("habilidade não existe");
        }

        return await skillsRepository.delete(skill_id)
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

export { DeleteSkillService };