import { Request, Response } from "express";
import { UpdateUserService } from "../../services/User/UpdateUserService";
import { UpdateCandidateService } from "../../services/Candidate/UpdateCandidateService";

class UpdateCandidateController {

  async handle(request: Request, response: Response) {
    
    const profileLocation = request.body.profileLocation;

    if (!profileLocation) {
      return response.status(400).json({ error: "Dados de localização do perfil são obrigatórios." });
    }

    const updateCandidateService = new UpdateCandidateService();

    try {
      const user = await updateCandidateService.execute(
        profileLocation,
      );

      if (user instanceof Error) {
        return response.status(400).json({
          error: user.message,
        });
      }
      return response.json(user);
    } catch (error) {
      console.error("Erro ao atualizar o candidato:", error);
      return response.status(500).json({
        error: "Erro interno do servidor ao atualizar o candidato.",
      });
    }
  }
}

export { UpdateCandidateController };