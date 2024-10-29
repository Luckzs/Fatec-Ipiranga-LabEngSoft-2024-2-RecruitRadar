import { Request, Response } from 'express';
import { DeleteSkillService } from '../../services/Skill/DeleteSkillService';

class DeleteSkillController {
  async handle(request: Request, response: Response) {
    const  skill_id = request.params.id;

    const deleteSkillService = new DeleteSkillService();

    const msg  = await deleteSkillService.execute({
        skill_id
        });

    if (msg instanceof Error) {
        return response.status(400).json({
            error: msg.message,
        });
    }

    return response.json(msg);
  }
}

export { DeleteSkillController };
