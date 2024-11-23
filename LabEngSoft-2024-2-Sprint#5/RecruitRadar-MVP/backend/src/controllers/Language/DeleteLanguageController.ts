import { Request, Response } from 'express';
import { DeleteLanguageService } from '../../services/Language/DeleteLanguageService';

class DeleteLanguageController {
  async handle(request: Request, response: Response) {

    const language_id = request.params.id;

    const deleteLanguageService = new DeleteLanguageService();

    const msg = await deleteLanguageService.execute({
      language_id
    });

    if (msg instanceof Error) {
      return response.status(400).json({
        error: msg.message,
      });
    }

    return response.json(msg);
  }
}

export { DeleteLanguageController };














