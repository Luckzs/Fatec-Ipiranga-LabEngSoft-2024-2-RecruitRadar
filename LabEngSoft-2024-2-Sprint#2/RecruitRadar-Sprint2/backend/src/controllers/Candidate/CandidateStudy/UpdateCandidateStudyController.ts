import {   Request, Response } from 'express';
import { UpdateCandidateStudyService } from '../../../services/Candidate/CandidateStudy/UpdateCandidateStudyService';

class UpdateCandidateStudyController {
    async handle(request: Request, response: Response) {

        const qualifications = request.body.qualifications;
        console.log(qualifications);

        const email = request.params.email;
        console.log(email);

        if (!qualifications || !Array.isArray(qualifications) || qualifications.length === 0) {
            return response.status(400).json({ message: 'Nenhuma Qualificação foi enviada ou o formato é inválido.' });
        }
        
        const updateCandidateStudyService = new UpdateCandidateStudyService();
        try {
            const savedQualifications = await Promise.all(qualifications.map(qualification => {
                updateCandidateStudyService.execute(
                    {
                        email,
                        institution_name: qualification.EduInst,
                        level: qualification.level,
                        course_name: qualification.course,
                        situation: qualification.situation,
                        start_date: new Date(qualification.startDate),
                        completion_date: new Date(qualification.endDate),
                        candidate_study_id: qualification.candidate_study_id,
                    }
                );
            }
            ));
            return response.status(201).json({ message: 'Qualificações salvas com sucesso!', data: savedQualifications });
        } catch (error) {
            console.error(error);
            return response.status(500).json({ message: 'Erro ao salvar qualificações', error: error });
        }
    }
}

export { UpdateCandidateStudyController };