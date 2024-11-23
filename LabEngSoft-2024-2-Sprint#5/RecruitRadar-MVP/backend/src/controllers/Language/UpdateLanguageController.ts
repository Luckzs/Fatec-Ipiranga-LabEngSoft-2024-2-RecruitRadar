import { Request, Response } from 'express';
import { UpdateLanguageService } from '../../services/Language/UpdateLanguageService';

class UpdateLanguageController {
  async handle(request: Request, response: Response) {
    
    const { language_id, course_name} = request.body;

    const updateLanguageService = new UpdateLanguageService();

    const name = await updateLanguageService.execute({
        language_id, course_name
        
    });

    if(name instanceof Error) {
        return response.status(400).json({
            error: name.message,
        });
    }

    return response.json(name);

  }
}

export { UpdateLanguageController };