import { Request, Response } from 'express';
import { UpdateCandidateObjectiveService } from '../../../services/Candidate/CandidateObjective/UpdateCandidateObjectiveService';

class UpdateCandidateObjectiveController {
    async handle(request: Request, response: Response) {

        const objectives = request.body.objectives;

        console.log(objectives);

        if (!objectives) {
            return response.status(400).json({ message: 'Nenhum objetivo foi enviado ou o formato é inválido.' });
        }


        const updateCandidateObjectiveService = new UpdateCandidateObjectiveService();
        try {
            const candidateObjective = await updateCandidateObjectiveService.execute(
                objectives
            );

            if (candidateObjective instanceof Error) {
                return response.status(400).json({
                    error: candidateObjective.message,
                });
            }

            return response.json(candidateObjective);
        } catch (error) {
            console.error("Erro ao atualizar o objetivo do candidato:", error);
            return response.status(500).json({
                error: "Erro interno do servidor ao atualizar o objetivo do candidato.",
            });
        }
    }
}

export { UpdateCandidateObjectiveController };