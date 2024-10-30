import { Request, Response } from 'express';
import { CreateCandidateObjectiveService } from '../../../services/Candidate/CandidateObjective/CreateCandidateObjectiveService';

class CreateCandidateObjectiveController {
    async handle(request: Request, response: Response) {

        const Objectives = request.body.objectives;

        if (!Objectives) {
            return response.status(400).json({ message: 'Nenhum objetivo foi enviado ou o formato é inválido.' });
        }

        const createCandidateObjectiveService = new CreateCandidateObjectiveService();

        try {
            const savedObjectives = await
                createCandidateObjectiveService.execute({
                    email: Objectives.email,
                    job: Objectives.job,
                    work_model: Objectives.work_model,
                    salary_expectation: Objectives.salary_expectation,
                    distance_radius: Objectives.distance_radius,
                    professional_area: Objectives.professional_area
                });


            return response.status(201).json({ message: 'Objetivos salvos com sucesso!', data: savedObjectives });
        }
        catch (error) {
            console.error(error);
            return response.status(500).json({ message: 'Erro ao salvar objetivos', error: error });
        }
    }
}

export { CreateCandidateObjectiveController };
