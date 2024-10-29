import { connectionSource } from "../../../config/ormconfig";
import { Candidate } from "../../../entities/Candidate";
import { CandidateExperience } from "../../../entities/CandidateExperience";
import { Experience } from "../../../entities/Experience";

interface ICandidateExperienceRequest {
    email: string;
    candidate_experience_id: string;
    title: string;
    company_name: string;
    start_date: Date;
    end_date: Date;
}

function differenceInDays(date1: Date, date2: Date) {
    const diffInMs = Math.abs(new Date(date2).getTime() - new Date(date1).getTime());
    return diffInMs / (1000 * 60 * 60 * 24);
}

class UpdateCandidateExperienceService {
    async execute( data: ICandidateExperienceRequest) {
        if (!data) {
            throw new Error("Invalid data");
        }

        const { email,title, candidate_experience_id, company_name, start_date, end_date } = data;

        const candidateExperienceRepository = connectionSource.getRepository(CandidateExperience);
        const experienceRepository = connectionSource.getRepository(Experience);
        const candidateRepository = connectionSource.getRepository(Candidate);


        let candidateExperience = await candidateExperienceRepository.findOne({
            where: { candidate_experience_id},
            relations: ["Experience"],
        });

        if (!candidateExperience) {
            
            let candidate = await candidateRepository.findOne({
                where: { User: { email } },
                relations: ["User"],
            });

            if (!candidate) {
                throw new Error("Candidato não encontrado");
            }

            let experience = await experienceRepository.findOne({
                where: { title: title },
            });

            if (!experience) {
                experience = experienceRepository.create({
                    title: title,
                });
                await experienceRepository.save(experience);
            }

            candidateExperience = candidateExperienceRepository.create({
                company_name: company_name,
                start_date: start_date,
                end_date: end_date,
                period: differenceInDays(start_date, end_date).toString(),
                Experience: experience,
                Candidate: candidate,
            });
            await candidateExperienceRepository.save(candidateExperience);
            return {message : "Nova experiencia do candidato criada com sucesso"};
        }

        const experienceToUpdate = candidateExperience.Experience;

        if(experienceToUpdate.title !== title){
            let newExperience = await experienceRepository.findOne({
                where: { title: title },
            });

            if (!newExperience) {
                newExperience = experienceRepository.create({
                    title: title,
                });
                await experienceRepository.save(newExperience);
            }
            candidateExperience.Experience = newExperience;
        }

        candidateExperience.company_name = company_name;
        candidateExperience.start_date = start_date;
        candidateExperience.end_date = end_date;
        candidateExperience.period = differenceInDays(start_date, end_date).toString();
        candidateExperience.updated_at = new Date();

        await candidateExperienceRepository.save(candidateExperience);
        return {message : "Experiencia do candidato atualizada com sucesso"};
    }
}

export { UpdateCandidateExperienceService };
