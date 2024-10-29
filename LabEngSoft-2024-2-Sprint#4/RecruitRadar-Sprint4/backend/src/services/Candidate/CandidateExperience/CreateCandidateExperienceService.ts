import e from "express";
import { connectionSource } from "../../../config/ormconfig";
import { Candidate } from "../../../entities/Candidate";
import { CandidateExperience } from "../../../entities/CandidateExperience";
import { Experience } from "../../../entities/Experience";

interface ICandidateExperienceRequest {
    title: string;
    email: string;
    company_name: string;
    start_date: Date;
    end_date: Date;
    //candidate_id: string;
    //experience_id: string;
}

function differenceInDays(date1: Date, date2: Date) {
    const diffInMs = Math.abs(new Date(date2).getTime() - new Date(date1).getTime());
    return diffInMs / (1000 * 60 * 60 * 24);
}

class CreateCandidateExperienceService {
    async execute(data: ICandidateExperienceRequest) {

        console.log('Title:',data.title);
        console.log('Email:', data.email);
        console.log('Company Name:', data.company_name);
        console.log('Start Date:', data.start_date);
        console.log('End Date:', data.end_date);

        if (!data) {
            throw new Error("Invalid data");
        }

        const { title, email, company_name, start_date, end_date } = data;
        
        const candidateExperienceRepository = connectionSource.getRepository(CandidateExperience);

        const experienceRepository = connectionSource.getRepository(Experience);

        const candidateRepository = connectionSource.getRepository(Candidate);

        const candidate = await candidateRepository.findOne({
            where : { User :{email}}
            ,relations: ["User"]}
        );

        let experience = await experienceRepository.findOne({
            where: { title },
        });
        
        if (!candidate) {
            throw new Error("Candidato não encontrado");
        }

        if (!experience) {
            experience = experienceRepository.create({
                title,
            });

            await experienceRepository.save(experience);
        }

        const candidateExperienceAlreadyExists = await candidateExperienceRepository.findOne({
            where: { candidate_id: candidate.candidate_id, experience_id: experience.experience_id },
        });

        if (candidateExperienceAlreadyExists) {
            throw new Error("Experiência de Candidato já existente");
        }

        console.log(differenceInDays(start_date, end_date));

        const candidateExperience = candidateExperienceRepository.create({
            candidate_id: candidate.candidate_id,
            experience_id: experience.experience_id,
            company_name,
            start_date,
            end_date,
            period: differenceInDays(start_date, end_date).toString()
        });

        await candidateExperienceRepository.save(candidateExperience);

        return candidateExperience;
    }
}

export { CreateCandidateExperienceService };

