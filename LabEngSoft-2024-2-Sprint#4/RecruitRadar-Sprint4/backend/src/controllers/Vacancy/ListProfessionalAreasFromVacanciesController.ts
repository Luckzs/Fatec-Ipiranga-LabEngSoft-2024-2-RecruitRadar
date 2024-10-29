import { Request, Response } from 'express';
import { ListProfessionalAreasFromVacancies } from '../../services/Vacancy/ListProfessionalAreasFromVacanciesService';


class ListProfessionalAreasFromVacanciesController {
    async handle(request: Request, response: Response) {

        const listProfessionalAreasFromVacanciesService = new ListProfessionalAreasFromVacancies();

        const professional_areas = await listProfessionalAreasFromVacanciesService.execute();

        return response.json(professional_areas);
    }
}

export { ListProfessionalAreasFromVacanciesController };
