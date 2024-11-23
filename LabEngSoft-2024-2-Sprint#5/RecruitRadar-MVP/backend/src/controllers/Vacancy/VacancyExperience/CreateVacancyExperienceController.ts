import {    Request, Response } from 'express';
import { CreateVacancyExperienceService } from '../../../services/VacancyExperience/CreateVacancyExperienceService';

class CreateVacancyExperienceController {
    async handle(request: Request, response: Response) {

        const {  vacancy_id, experience_id,period } = request.body;

        const createVacancyExperienceService = new CreateVacancyExperienceService();

        const vacancyExperience = await createVacancyExperienceService.execute({  vacancy_id, experience_id,period});

        return response.json(vacancyExperience);
    }
}

export { CreateVacancyExperienceController };