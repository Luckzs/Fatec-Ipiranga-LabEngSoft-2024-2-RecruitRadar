import { Request, Response } from 'express';
import { CreateVacancyService } from '../../services/Vacancy/CreateVacancyService';

class CreateVacancyController {
    async handle(request: Request, response: Response) {
        //const data = request.body;
        //console.log(data);
        
        const {            
            company_name,
            title,
            description,
            salary,
            salary_max,
            city,
            state,
            work_model,
            webid,
            url,
            contract_type,
            contract_period,
            experience_title,
            experience_period,
            language_course_name,
            study_course_name,
            logo,
            pcd,
            skills
        } = request.body;
 
        const createVacancyService = new CreateVacancyService();

        const vacancy = await createVacancyService.execute({             company_name,
            title,
            description,
            salary,
            salary_max,
            city,
            state,
            work_model,
            webid,
            url,
            contract_type,
            contract_period,
            experience_title,
            experience_period,
            language_course_name,
            study_course_name,
            logo,
            pcd,
            skills
        });

      return response.json("Vagas Adicionadas: "+vacancy);
    }
}

export { CreateVacancyController };
