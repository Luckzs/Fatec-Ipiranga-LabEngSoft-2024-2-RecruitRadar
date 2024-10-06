import { Vacancy } from "../../entities/Vacancy";
import { connectionSource } from "../../config/ormconfig";

interface IVacancyRequest {
    vacancy_id: string;
    company_name: string;
    title: string;
    description: string;
    salary: string;
    address: string;
    complement: string;
    city: string;
    state: string;
    postal_code: string
    sex: string;
    pcd: boolean;
}

class UpdateVacancyService {
    async execute({ vacancy_id,company_name, title, description, salary, address, complement, city, state, postal_code,sex,pcd }: IVacancyRequest) {   
        
        const vacancyRepository = connectionSource.getRepository(Vacancy);
        
        if (!vacancy_id) {
            throw new Error("Invalid data");
        }   

        const vacancyAlreadyExists = await vacancyRepository.findOne({
            where: { vacancy_id },
        });

        if (!vacancyAlreadyExists) {
            throw new Error("Vaga não existe");
        }

        vacancyAlreadyExists.company_name = company_name? company_name : vacancyAlreadyExists.company_name;
        vacancyAlreadyExists.title = title? title : vacancyAlreadyExists.title;
        vacancyAlreadyExists.description = description? description : vacancyAlreadyExists.description;
        vacancyAlreadyExists.salary = salary? salary : vacancyAlreadyExists.salary;
        vacancyAlreadyExists.address = address? address : vacancyAlreadyExists.address;
        vacancyAlreadyExists.complement = complement? complement : vacancyAlreadyExists.complement;
        vacancyAlreadyExists.city = city? city : vacancyAlreadyExists.city;
        vacancyAlreadyExists.state = state? state : vacancyAlreadyExists.state;
        vacancyAlreadyExists.postal_code = postal_code? postal_code : vacancyAlreadyExists.postal_code;
        vacancyAlreadyExists.sex = sex? sex : vacancyAlreadyExists.sex;
        vacancyAlreadyExists.pcd = pcd? pcd : vacancyAlreadyExists.pcd;
        vacancyAlreadyExists.updated_at = new Date();

        return await vacancyRepository.update(vacancy_id, vacancyAlreadyExists).then(f => {
            console.log(f);
            var messageUpdate = {
                message: "Registro atualizado com sucesso"
            }

            return messageUpdate;

        }, err => {
            throw new Error("Erro na atualização");
        }
        );
    }
}

export { UpdateVacancyService };