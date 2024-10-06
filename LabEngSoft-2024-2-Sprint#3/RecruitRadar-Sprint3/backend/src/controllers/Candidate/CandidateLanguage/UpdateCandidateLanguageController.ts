import { Request, Response } from 'express';
import { UpdateCandidateLanguageService } from '../../../services/Candidate/CandidateLanguage/UpdateCandidateLanguageService';

class UpdateCandidateLanguageController {
  async handle(request: Request, response: Response) {

    const languages = request.body.languages;

    const email = request.params.email;

    if (!languages || !Array.isArray(languages) || languages.length === 0) {
      return response.status(400).json({ message: 'Nenhuma Linguagem foi enviada ou o formato é inválido.' });
    }

    const updateCandidateLanguageService = new UpdateCandidateLanguageService();

    try {
      const savedLanguages = await Promise.all(languages.map(language => {
        updateCandidateLanguageService.execute(
          {
            email,
            course_name: language.course_name,
            level: language.level,
            candidate_language_id: language.candidate_language_id,
          }
        );
      }
      ));
      return response.status(201).json({ message: 'Linguagens salvas com sucesso!', data: savedLanguages });
    } catch (error) {
      console.error(error);
      return response.status(500).json({ message: 'Erro ao salvar linguagens', error: error });
    }

  }
}

export { UpdateCandidateLanguageController };