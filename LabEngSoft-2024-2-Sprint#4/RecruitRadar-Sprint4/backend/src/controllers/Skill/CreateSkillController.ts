import { Request, Response } from 'express';
import { CreateSkillService } from '../../services/Skill/CreateSkillService';

class CreateSkillController {
  async handle(request: Request, response: Response) {

    const { text } = request.body;

    const createSkillService = new CreateSkillService();

    const skill = await createSkillService.execute({ text });
    
    return response.json({ text });
  }
}

export { CreateSkillController };