
import { Request, Response } from "express";
import { DeleteCandidateObjective } from "../../../services/Candidate/CandidateObjective/DeleteCandidateObjectiveService";

class DeleteCandidateObjectiveController {
    async handle(request: Request, response: Response) {
        const candidate_objective_id = request.params.id;

        const  deleteCandidateObjective = new DeleteCandidateObjective();

        const msg = await deleteCandidateObjective.execute({
            candidate_objective_id
        });
        
        if(msg instanceof Error) {
            return response.status(400).json({
                error: msg.message,
            });
        }

        return response.json(msg);
        
    }
}

export { DeleteCandidateObjectiveController };