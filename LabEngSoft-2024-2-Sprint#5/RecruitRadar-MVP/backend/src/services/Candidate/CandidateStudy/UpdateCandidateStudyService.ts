import { CandidateStudy } from "../../../entities/CandidateStudy";
import { connectionSource } from "../../../config/ormconfig";
import { Study } from "../../../entities/Study";
import { Candidate } from "../../../entities/Candidate";

interface ICandidateStudyRequest {
    email: string;
    candidate_study_id: string;
    course_name: string;
    level: string;
    institution_name: string;
    situation: string;
    start_date: Date;
    completion_date: Date;
}

class UpdateCandidateStudyService {
    async execute(data: ICandidateStudyRequest) {
        if (!data) {
            throw new Error("Invalid data");
        }

        const { email, candidate_study_id, course_name, level, institution_name, situation, start_date, completion_date } = data;

        const candidateStudyRepository = connectionSource.getRepository(CandidateStudy);
        const studyRepository = connectionSource.getRepository(Study);
        const candidateRepository = connectionSource.getRepository(Candidate);

        // Verifica se o CandidateStudy já existe
        let candidateStudy = await candidateStudyRepository.findOne({
            where: { candidate_study_id },
            relations: ["Study"],
        });

        if (!candidateStudy) {

            let candidate = await candidateRepository.findOne({
                where: { User: { email } },
                relations: ["User"],
            });

            if (!candidate) {
                throw new Error("Candidato não encontrado");
            }

            // Se o CandidateStudy não existe, verificamos se o Study existe
            let study = await studyRepository.findOne({
                where: {education: level },
            });

            if (!study) {
                // Cria um novo Study se não encontrado
                study = studyRepository.create({
                    education: level,
                });
                await studyRepository.save(study);
            }

                // Cria um novo CandidateStudy
                candidateStudy = candidateStudyRepository.create({
                    institution_name,
                    course_name,
                    situation,
                    start_date,
                    completion_date,
                    Candidate: candidate, // Relaciona o novo ou existente Candidate criado/acessado acima
                    Study: study, // Relaciona o novo ou existente Study criado/acessado acima
                });
                await candidateStudyRepository.save(candidateStudy);

                return { message: "Novo estudo de candidato criado com sucesso" };

        }

        // Se o CandidateStudy já existe, verificamos se há mudanças no Study relacionado
        const studyToUpdate = candidateStudy.Study;

        if (studyToUpdate.education !== level) {
            // Verifica se existe um outro Study com o mesmo curso e nível fornecidos
            let newStudy = await studyRepository.findOne({
                where: {education: level },
            });

            if (!newStudy) {
                // Se não existir, cria um novo Study
                newStudy = studyRepository.create({
                    education: level,
                });
                await studyRepository.save(newStudy);
            }

            // Atualiza o relacionamento com o novo Study
            candidateStudy.Study = newStudy;
        }

        // Atualiza outros campos do CandidateStudy
        candidateStudy.institution_name = institution_name || candidateStudy.institution_name;
        candidateStudy.course_name = course_name || candidateStudy.course_name;
        candidateStudy.situation = situation || candidateStudy.situation;
        candidateStudy.start_date = start_date || candidateStudy.start_date;
        candidateStudy.completion_date = completion_date || candidateStudy.completion_date;
        candidateStudy.updated_at = new Date();

        await candidateStudyRepository.save(candidateStudy);

        return { message: "Estudo de candidato atualizado com sucesso" };
    }
}

export { UpdateCandidateStudyService };
