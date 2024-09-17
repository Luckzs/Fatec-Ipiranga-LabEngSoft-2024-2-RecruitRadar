import { Request, Response } from 'express';
import { CreateCandidateSkillService } from '../../../services/Candidate/CandidateSkill/CreateCandidateSkillService';

class CreateCandidateSkillController {
    async handle(request: Request, response: Response) {
        
        const skills = request.body.Skills;

        if (!skills || !Array.isArray(skills) || skills.length === 0) {
            return response.status(400).json({ message: 'Nenhuma habilidade foi enviada ou o formato é inválido.' });
        }

        const createCandidateSkillService = new CreateCandidateSkillService();

        try {
            const savedSkills = await Promise.all(skills.map(skill => {
                createCandidateSkillService.execute({
                    email: skill.email,
                    text: skill.text,
                });
            }
            ));
            return response.status(201).json({ message: 'Habilidades salvas com sucesso!', data: savedSkills });
        } catch (error) {
            console.error(error);
            return response.status(500).json({ message: 'Erro ao salvar habilidades', error: error });
        }
    }
}

export {CreateCandidateSkillController};