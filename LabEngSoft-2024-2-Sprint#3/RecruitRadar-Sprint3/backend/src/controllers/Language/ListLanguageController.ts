import { Request, Response } from 'express';
import { ListLanguageService } from '../../services/Language/ListLanguageService';

class ListLanguageController {
  async handle(request: Request, response: Response) {

    const listLanguageService = new ListLanguageService();

    const languages = await listLanguageService.execute();

    return response.json(languages);
  }
}

export { ListLanguageController };