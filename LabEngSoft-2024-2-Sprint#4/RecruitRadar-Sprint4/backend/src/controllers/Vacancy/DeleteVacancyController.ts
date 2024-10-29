import { Request, Response } from 'express';
import { DeleteVacancyService } from '../../services/Vacancy/DeleteVacancyService';

class DeleteVacancyController {
    async handle(request: Request, response: Response) {

        const  vacancy_id = request.params.id;

        const deleteVacancyService = new DeleteVacancyService();

        const msg = await deleteVacancyService.execute({
            vacancy_id
        });

        if (msg instanceof Error) {
            return response.status(400).json({
                error: msg.message,
            });
        }

        return response.json(msg);

    }
}

export { DeleteVacancyController };
