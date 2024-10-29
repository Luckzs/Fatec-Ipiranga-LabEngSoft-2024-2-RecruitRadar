import { connectionSource } from "../../../config/ormconfig";
import { Candidate } from "../../../entities/Candidate";
import { CandidateLanguage } from "../../../entities/CandidateLanguage";
import { Language } from "../../../entities/Language";

interface ICandidateLanguageRequest {
    email: string;
    course_name: string;
    level: string;
}

class CreateCandidateLanguageService {
    async execute(data: ICandidateLanguageRequest) {
        
        if(!data) {
            throw new Error("Invalid data");
        }

        const { email, course_name, level } = data;

        const candidateRepository = connectionSource.getRepository(Candidate);

        const languageRepository = connectionSource.getRepository(Language);
        
        const candidateLanguageRepository = connectionSource.getRepository(CandidateLanguage);

        const candidate = await candidateRepository.findOne({
            where: { User: { email } },
            relations: ["User"],
        });

        let language = await languageRepository.findOne({
            where: { course_name },
        });

        if (!candidate) {
            throw new Error("Candidato não encontrado");
        }

        if (!language) {
            language = languageRepository.create({
                course_name,
            });

            await languageRepository.save(language);
        }

        const candidateLanguageAlreadyExists = await candidateLanguageRepository.findOne({
            where: { candidate_id:candidate.candidate_id, language_id: language.language_id },
        });
        
        if (candidateLanguageAlreadyExists) {
            throw new Error("Idioma de Candidato já existe");
        }

        const candidateLanguage = candidateLanguageRepository.create({
            language_id: language.language_id,
            candidate_id: candidate.candidate_id,
            level,
        });

        await candidateLanguageRepository.save(candidateLanguage)

        return candidateLanguage;
        
    }
}

export { CreateCandidateLanguageService };
