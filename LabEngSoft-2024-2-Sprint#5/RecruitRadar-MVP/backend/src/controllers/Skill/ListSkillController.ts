import { Request, Response } from 'express';
import { ListSkillService } from '../../services/Skill/ListSkillService';

class ListSkillController {
  async handle(request: Request, response: Response) {

    const listSkillService = new ListSkillService();

    const skills = await listSkillService.execute();

    return response.json(skills);
    

}
}   

export { ListSkillController };
