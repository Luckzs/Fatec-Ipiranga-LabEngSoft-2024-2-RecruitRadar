import { CreateCandidateExperienceService } from "../../../services/Candidate/CandidateExperience/CreateCandidateExperienceService";
import { Request, Response } from "express";

class CreateCandidateExperienceController {

    async handle(request: Request, response: Response) {
        const experiences = request.body.experiences;

        console.log('Experiences:', experiences);

        if (!experiences || !Array.isArray(experiences) || experiences.length === 0) {
            return response.status(400).json({ message: 'Nenhuma experiência foi enviada ou o formato é inválido.' });
        }
        
        const createCandidateExperienceService= new CreateCandidateExperienceService();

        try {
            // Processa cada experiência e salva no banco de dados
            const savedExperiences = await Promise.all(experiences.map(experience =>{
                const startdate = new Date(experience.startDate);
                console.log('Start Date:', startdate);
                const enddate = new Date(experience.endDate);
                console.log('End Date:', enddate);
                createCandidateExperienceService.execute({
                    title: experience.title,
                    email: experience.email,
                    company_name: experience.company_name,
                    start_date: startdate,
                    end_date: enddate,
                    currently: experience.isCurrently
                })
            }));

            return response.status(201).json({ message: 'Experiências salvas com sucesso!', data: savedExperiences });
        } catch (error) {
            console.error(error);
            return response.status(500).json({ message: 'Erro ao salvar experiências', error: error});
        }
    }
}

export { CreateCandidateExperienceController };