import { Request, Response } from 'express';
import { CreateVacancyService } from '../../services/Vacancy/CreateVacancyService';

class CreateVacancyController {
    async handle(request: Request, response: Response) {
        const vacancies = request.body;

        // Verifique se `vacancies` é uma lista de objetos de vaga
        if (!Array.isArray(vacancies)) {
            return response.status(400).json({ error: 'Formato de dados inválido. Esperado uma lista de vagas.' });
        }

        const createVacancyService = new CreateVacancyService();

        try {
            // Processa as vagas em paralelo
            await Promise.all(
                vacancies.map(async (vacancy) => {
                    try {
                        return await createVacancyService.execute({
                            webid: vacancy.id_da_vaga,
                            title: vacancy.titulo_da_vaga,
                            company_name: vacancy.nome_da_empresa,
                            work_model: vacancy.modelo_trabalho,
                            experience_title: vacancy.area_profissional,
                            description: vacancy.descricao_da_vaga,
                            skills: vacancy.habilidades,
                            url: vacancy.url_da_vaga,
                            city: vacancy.cidade_empresa,
                            state: vacancy.estado_empresa,
                            contract_type: vacancy.tipo_contrato,
                            contract_period: vacancy.periodo_contrato,
                            salary_max: vacancy.salario_max,
                            salary: vacancy.salario_min,
                            study_course_name: vacancy.escolaridade_min,
                            languages: vacancy.idioma,
                            experience_period: vacancy.experiencia_desejada,
                            pcd: vacancy.pcd,
                            logo: vacancy.logo_empresa,
                            professional_area: vacancy.area_profissional,
                        });
                    } catch (error) {
                        console.error(`Erro ao salvar vaga ${vacancy.titulo_da_vaga}:`, error);
                        return null; // Retorna null se houver erro, mas não interrompe o processamento
                    }
                })
            );

            console.log("Vagas processadas com sucesso");
            return response.status(200).json({ message: "Vagas adicionadas com sucesso" });
        } catch (error) {
            console.error("Erro ao processar vagas:", error);
            return response.status(500).json({ error: "Erro ao processar vagas" });
        }
    }
}

export { CreateVacancyController };