import e, { Request, Response } from 'express';
import { CreateCandidateStudyService } from '../../../services/Candidate/CandidateStudy/CreateCandidateStudyService';

class CreateCandidateStudyController {
    async handle(request: Request, response: Response) {

        const qualifications = request.body.qualifications;

        if (!qualifications || !Array.isArray(qualifications) || qualifications.length === 0) {
            return response.status(400).json({ message: 'Nenhuma Qualificação foi enviada ou o formato é inválido.' });
        }

        const createCandidateStudyService = new CreateCandidateStudyService();

        try {
            const savedQualifications = await Promise.all(qualifications.map(qualification => {
                createCandidateStudyService.execute({
                    institution_name: qualification.EduInst,
                    level: qualification.level,
                    course: qualification.course,
                    situation: qualification.situation,
                    start_date: new Date(qualification.startDate),
                    completion_date: new Date(qualification.endDate),
                    email: qualification.email,
                });
            }
            ));
            return response.status(201).json({ message: 'Qualificações salvas com sucesso!', data: savedQualifications });
        } catch (error) {
            console.error(error);
            return response.status(500).json({ message: 'Erro ao salvar qualificações', error: error });
        }

    }
}

export { CreateCandidateStudyController };