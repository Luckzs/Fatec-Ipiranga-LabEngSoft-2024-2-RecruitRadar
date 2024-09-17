import { Request, Response } from "express";
import { ListCandidateExperiencesService } from "../../../services/Candidate/CandidateExperience/ListCandidateExperiencesService";

class ListCandidateExperienceController{
    async handle(request: Request, response: Response){

        const listCandidateExperiencesService = new ListCandidateExperiencesService();

        const candidateExperience = await listCandidateExperiencesService.execute();

        return response.json(candidateExperience);
    }
}

export { ListCandidateExperienceController };