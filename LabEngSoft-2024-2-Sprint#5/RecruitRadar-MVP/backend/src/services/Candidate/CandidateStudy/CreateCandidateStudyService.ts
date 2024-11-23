import { connectionSource } from "../../../config/ormconfig";
import { Candidate } from "../../../entities/Candidate";
import { CandidateStudy } from "../../../entities/CandidateStudy";
import { Study } from "../../../entities/Study";

interface ICandidateStudyRequest {
    email: string;
    course: string;
    level: string;
    institution_name: string;
    situation: string;
    start_date: Date;
    completion_date: Date;
}

class CreateCandidateStudyService {
    async execute(data: ICandidateStudyRequest) {

        if(!data) {
            throw new Error("Invalid data");
        }

        const { email, course, level, institution_name, situation, start_date, completion_date } = data;

        const candidateStudyRepository = connectionSource.getRepository(CandidateStudy);

        const studyRepository = connectionSource.getRepository(Study);

        const candidateRepository = connectionSource.getRepository(Candidate);

        const candidate = await candidateRepository.findOne({
            where: { User: { email } },
            relations: ["User"],
        });

        let study = await studyRepository.findOne({
            where: { education: level },
        });

        if (!candidate) {
            throw new Error("Candidato não encontrado");
        }

        if (!study) {
            study = studyRepository.create({
                education: level
            });

            await studyRepository.save(study);
        }

        const candidateStudyAlreadyExists = await candidateStudyRepository.findOne({
            where: { candidate_id:candidate.candidate_id, study_id: study.study_id },
        });

        if (candidateStudyAlreadyExists) {
            throw new Error("Estudo de Candidato já existente");
        }

        const candidateStudy = candidateStudyRepository.create({
            institution_name,
            course_name: course,
            situation,
            start_date,
            completion_date,
            candidate_id: candidate.candidate_id,
            study_id: study.study_id,
        });

        await candidateStudyRepository.save(candidateStudy);

        return candidateStudy;
    }
}

export { CreateCandidateStudyService };
