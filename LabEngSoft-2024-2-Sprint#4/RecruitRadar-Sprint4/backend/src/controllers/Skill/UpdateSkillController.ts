import { Request, Response } from 'express';
import { UpdateSkillService } from '../../services/Skill/UpdateSkillService';

class UpdateSkillController {
  async handle(request: Request, response: Response) {

    const {  skill_id, text } = request.body;

    const updateSkillService = new UpdateSkillService();

    const skill = await updateSkillService.execute({ skill_id, text });

    if (skill instanceof Error) {
        return response.status(400).json({
            error: skill.message,
        });
    }

    return response.json({ skill });
  }
}

export { UpdateSkillController };