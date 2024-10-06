import { Study } from "../../entities/Study";
import { connectionSource } from "../../config/ormconfig";

interface IStudyRequest {
    course_name: string;
    level: string;
}

class CreateStudyService {
    async execute({ course_name, level }: IStudyRequest) {
        const studyRepository = connectionSource.getRepository(Study);

        if (!course_name || !level) {
            throw new Error("Invalid data");
        }

        const studyAlreadyExists = await studyRepository.findOne({
            where: { education: level },
        });

        if (studyAlreadyExists) {
            throw new Error("Estudo já existe");
        }

        const study = studyRepository.create({
            education: level,
        });

        await studyRepository.save(study);

        return study;
    }
}
export { CreateStudyService };