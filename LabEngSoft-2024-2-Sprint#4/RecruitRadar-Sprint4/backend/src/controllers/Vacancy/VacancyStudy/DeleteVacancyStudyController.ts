import { Request, Response } from "express";
import { DeleteVacancyStudyService } from "../../../services/VacancyStudy/DeleteVacancyStudyService";

class DeleteVacancyStudyController {
    async handle(request: Request, response: Response) {
        const vacancy_study_id = request.params.id;

        const deleteVacancyStudyService = new DeleteVacancyStudyService();

        const msg =  await deleteVacancyStudyService.execute({ vacancy_study_id });

        if (msg instanceof Error) {
            return response.status(400).json({
                error: msg.message,
            });
        }

        return response.json(msg);

    }
}

export { DeleteVacancyStudyController };
