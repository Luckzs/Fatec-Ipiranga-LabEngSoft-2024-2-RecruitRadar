import { Request, Response } from 'express';
import { CreateVacancyService } from '../../services/Vacancy/CreateVacancyService';

class CreateVacancyController {
    async handle(request: Request, response: Response) {
        const data = request.body;
        console.log(data);
        
        //const { company_name, title, description, salary, address, complement, city, state, postal_code,sex,pcd  } = request.body;

        //const createVacancyService = new CreateVacancyService();

       // const vacancy = await createVacancyService.execute({ company_name, title, description, salary, address, complement, city, state, postal_code,sex,pcd  });

      return response.json(data);
    }
}

export { CreateVacancyController };
