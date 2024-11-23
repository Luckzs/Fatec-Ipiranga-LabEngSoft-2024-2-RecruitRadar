import { Request, Response } from 'express';
import { UpdateCandidateExperienceService } from '../../../services/Candidate/CandidateExperience/UpdateCandidateExperienceService';

class UpdateCandidateExperienceController {
    async handle(request: Request, response: Response) {
        const experiences = request.body.experiences;
        console.log(experiences);

        const email = request.params.email;
        console.log(email);

        if (!experiences || !Array.isArray(experiences) || experiences.length === 0) {
            return response.status(400).json({ message: 'Nenhuma Experiência foi enviada ou o formato é inválido.' });
        }

        const updateCandidateExperienceService = new UpdateCandidateExperienceService();

        try {
            const savedExperiences = await Promise.all(experiences.map(experience => {
                updateCandidateExperienceService.execute(
                    {
                        email,
                        company_name: experience.company_name,
                        title: experience.title,
                        start_date: new Date(experience.start_date),
                        end_date: new Date(experience.end_date),
                        candidate_experience_id: experience.candidate_experience_id,
                        currently: experience.currently
                    }
                );
            }
            ));
            return response.status(201).json({ message: 'Experiências salvas com sucesso!', data: savedExperiences });
        } catch (error) {
            console.error(error);
            return response.status(500).json({ message: 'Erro ao salvar experiências', error: error });
        }
    }
}

export { UpdateCandidateExperienceController };