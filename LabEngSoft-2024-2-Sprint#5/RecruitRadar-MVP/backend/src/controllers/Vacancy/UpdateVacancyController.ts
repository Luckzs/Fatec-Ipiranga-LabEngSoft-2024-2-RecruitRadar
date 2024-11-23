import { Request, Response } from 'express';
import { UpdateVacancyService } from '../../services/Vacancy/UpdateVacancyService';

class UpdateVacancyController {
    async handle(request: Request, response: Response) {

        const { vacancy_id,company_name, title, description, salary, address, complement, city, state, postal_code,sex,pcd } = request.body;

        const updateVacancyService = new UpdateVacancyService();

        const vacancy = await updateVacancyService.execute({
            vacancy_id,company_name, title, description, salary, address, complement, city, state, postal_code,sex,pcd  
        });

        return response.json(vacancy);
    }
}

export { UpdateVacancyController };