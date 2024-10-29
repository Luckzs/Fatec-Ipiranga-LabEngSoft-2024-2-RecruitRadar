import { instanceToPlain } from "class-transformer";
import { connectionSource } from "../../../config/ormconfig";
import { CandidateLanguage } from "../../../entities/CandidateLanguage";

class ListCandidateLanguageService {
    async execute() {
        const candidateLanguageRepository = connectionSource.getRepository(CandidateLanguage);

        const candidateLanguage = await candidateLanguageRepository.find({relations: ["Language", "Candidate"]});

        return instanceToPlain(candidateLanguage);
    }
}

export { ListCandidateLanguageService };
