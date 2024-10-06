import { Request, Response } from 'express';    
import { CreateCandidateLanguageService } from '../../../services/Candidate/CandidateLanguage/CreateCandidateLanguageService';

class CreateCandidateLanguageController {
    async handle(request: Request, response: Response) {

        const languages = request.body.Languages;

        if (!languages || !Array.isArray(languages) || languages.length === 0) {
            return response.status(400).json({ message: 'Nenhuma linguagem foi enviada ou o formato é inválido.' });
        }


        const createCandidateLanguageService = new CreateCandidateLanguageService();

        try {
            const savedLanguages = await Promise.all(languages.map(language => {
                createCandidateLanguageService.execute({
                    email: language.email,
                    course_name: language.course_name,
                    level: language.level,
                });
            }
            ));
            return response.status(201).json({ message: 'Linguagens salvas com sucesso!', data: savedLanguages });
        } catch (error) {
            console.error(error);
            return response.status(500).json({ message: 'Erro ao salvar linguagens', error: error });
        }
    }   
}

export {CreateCandidateLanguageController};