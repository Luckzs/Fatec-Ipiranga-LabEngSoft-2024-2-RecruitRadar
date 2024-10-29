import { connectionSource } from "../../../config/ormconfig";
import { Candidate } from "../../../entities/Candidate";
import { CandidateLanguage } from "../../../entities/CandidateLanguage";
import { Language } from "../../../entities/Language";

interface ICandidateLanguageRequest {
    email: string;
    course_name: string;
    candidate_language_id: string;
    level: string;
}

class UpdateCandidateLanguageService {
    async execute(data: ICandidateLanguageRequest) {

        if (!data) {
            throw new Error("Invalid data");
        }

        const { email, level, course_name, candidate_language_id } = data;

        const candidateLanguageRepository = connectionSource.getRepository(CandidateLanguage);
        const languageRepository = connectionSource.getRepository(Language);
        const candidateRepository = connectionSource.getRepository(Candidate);

        let candidateLanguage = await candidateLanguageRepository.findOne({
            where: { candidate_language_id },
            relations: ["Language"],
        });

        if (!candidateLanguage) {

            let candidate = await candidateRepository.findOne({
                where: { User: { email } },
                relations: ["User"],
            });

            if (!candidate) {
                throw new Error("Candidato não encontrado");
            }

            let language = await languageRepository.findOne({
                where: { course_name: course_name },
            });

            if (!language) {
                language = languageRepository.create({
                    course_name: course_name,
                });
                await languageRepository.save(language);
            }

            candidateLanguage = candidateLanguageRepository.create({
                level: level,
                Candidate: candidate,
                Language: language,
            });
            await candidateLanguageRepository.save(candidateLanguage);
            return { message: "Nova Linguagem do Candidato criada com sucesso" };
        }

        const languageToUpdate = candidateLanguage.Language;

        if (languageToUpdate.course_name !== course_name) {
            let newLanguage = await languageRepository.findOne({
                where: { course_name: course_name },
            });

            if (!newLanguage) {
                newLanguage = languageRepository.create({
                    course_name: course_name,
                });
                await languageRepository.save(newLanguage);
            }

            candidateLanguage.Language = newLanguage;
        }
        candidateLanguage.level = level;
        candidateLanguage.updated_at = new Date();

        await candidateLanguageRepository.save(candidateLanguage);

        return { message: "Linguagem do Candidato atualizada com sucesso" };
    }
}
export { UpdateCandidateLanguageService };
