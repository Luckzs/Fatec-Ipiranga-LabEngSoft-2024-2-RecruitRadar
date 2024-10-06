import { Study } from "../../entities/Study";
import { connectionSource } from "../../config/ormconfig";

interface IStudyRequest {
    study_id: string;
    course_name: string;
    level: string;
}

class UpdateStudyService {
    async execute({ study_id, course_name, level }: IStudyRequest) {
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

        studyAlreadyExists.education = level ? level : studyAlreadyExists.education;
        studyAlreadyExists.updated_at = new Date();

        return await studyRepository.update(study_id, studyAlreadyExists)
            .then(f => {
                var messageDelete = {
                    message: "Registro atualizado com sucesso"
                }

                return messageDelete;

            }, err => {
                throw new Error("Erro na atualização");
            });
    }
}

export { UpdateStudyService };


