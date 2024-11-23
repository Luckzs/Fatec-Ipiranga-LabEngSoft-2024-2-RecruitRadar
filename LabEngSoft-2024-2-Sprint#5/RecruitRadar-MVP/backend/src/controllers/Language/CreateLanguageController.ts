import { Request, Response } from 'express';
import { CreateLanguageService } from '../../services/Language/CreateLanguageService';

class CreateLanguageController {
  async handle(request: Request, response: Response) {

    const { course_name } = request.body;

    const createLanguageService = new CreateLanguageService();

    const name = await createLanguageService.execute({ course_name });

    if(name instanceof Error) {
        return response.status(400).json({
            error: name.message,
        });
    }
    return response.json(name);
  }
}

export { CreateLanguageController };
