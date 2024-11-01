import { Request, Response } from "express";
import { CreateMatchService } from "../../services/Match/CreateMatchService";

class CreateMatchController {
  async handle(request: Request, response: Response) {

    const { candidate_id, vacancy_id,score  } = request.body;

    const createMatchService = new CreateMatchService();

    const matchCreated = await createMatchService.execute({candidate_id, vacancy_id,score });

    return response.json(matchCreated);
  }
}

export { CreateMatchController };