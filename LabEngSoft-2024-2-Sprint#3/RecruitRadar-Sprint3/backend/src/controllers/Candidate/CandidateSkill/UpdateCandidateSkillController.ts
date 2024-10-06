import { Request, Response } from 'express';
import { UpdateCandidateSkillService } from '../../../services/Candidate/CandidateSkill/UpdateCandidateSkillService';

class UpdateCandidateSkillController {
    async handle(request: Request, response: Response) {

        const skills = request.body.skills;
        console.log(skills);

        const email = request.params.email;
        console.log(email);

        if (!skills || !Array.isArray(skills) || skills.length === 0) {
            return response.status(400).json({ message: 'Nenhuma Habilidade foi enviada ou o formato é inválido.' });
        }

        const updateCandidateSkillService = new UpdateCandidateSkillService();

        try {
            const savedSkills = await Promise.all(skills.map(skill => {
                updateCandidateSkillService.execute(
                    {
                        email,
                        text: skill.text,
                        candidate_skill_id: skill.candidate_skill_id,
                    }
                );
            }
            ));
            return response.status(201).json({ message: 'Habilidades salvas com sucesso!', data: savedSkills });
        } catch (error) {
            console.error(error);
            return response.status(500).json({ message: 'Erro ao salvar habilidades', error: error });
        }
    } 
}

export { UpdateCandidateSkillController };