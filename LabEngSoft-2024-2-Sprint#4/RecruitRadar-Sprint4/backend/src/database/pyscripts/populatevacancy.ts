import { CreateVacancyService } from "../../services/Vacancy/CreateVacancyService";
import { ListVacancyService } from "../../services/Vacancy/ListVacancyService";
const { PythonShell } = require("python-shell");
import { Request, Response } from "express";

class PopulateVacancyController {
  async handle(request: Request, response: Response) {
    // Definindo opções para o PythonShell
    let options = {
      mode: "text", 
      pythonPath: "python",
      pythonOptions: ['-u'], // Para obter os resultados do print em tempo real
      scriptPath: "src/database/pyscripts/", // Caminho do script Python
    };

    try {
      // Executa o script Python
      const messages: string[] = await PythonShell.run(
        "populatevacancypy.py",
        options
      );

      // Messages é uma lista de strings. Juntamos e analisamos como JSON
      const output = messages.join("\n");

      // Tenta analisar a saída como JSON
      const jsonResult = JSON.parse(output);

      // Cria uma instância do serviço de criação de vaga
      const createVacancyService = new CreateVacancyService();
      const listVacancyService = new ListVacancyService();

      // Se jsonResult for uma lista de vagas
      if (Array.isArray(jsonResult)) {
        const isdbdataempty = await listVacancyService.execute();

        if (isdbdataempty.length > 0) {
          // Envia os dados ao serviço utilizando Promise.all para execução paralela
          await Promise.all(
            jsonResult.map(async (vacancy) => {
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
                console.error(
                  `Erro ao salvar vaga ${vacancy.titulo_da_vaga}:`,
                  error,vacancy
                );
                return null; // Retorna null se houver erro, mas não interrompe o processamento
              }
            })
          );
        } else {
          // Inserção sequencial quando o banco está vazio
          for (const vacancy of jsonResult) {
            try {
              await createVacancyService.execute({
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
                languages: vacancy.languages,
                experience_period: vacancy.experiencia_desejada,
                pcd: vacancy.pcd,
                logo: vacancy.logo_empresa,
                professional_area: vacancy.area_profissional,
              });
            } catch (error) {
              console.error(
                `Erro ao salvar vaga ${vacancy.titulo_da_vaga}:`,
                error
              );
            }
          }
        }

        console.log("Dados enviados para o banco de dados");
        return response.status(200).json({ message: "Vagas populadas" });
      }
    } catch (error) {
      console.error("Erro ao executar o script Python:", error);
      return response.status(500).json({ error: "Erro ao popular as vagas" });
    }
  }
}

// Executa a função
//runPythonScript();

export { PopulateVacancyController };
