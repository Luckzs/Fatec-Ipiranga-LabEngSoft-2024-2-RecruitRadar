import { CreateVacancyService } from "../../services/Vacancy/CreateVacancyService";
const { PythonShell } = require('python-shell');

// Definindo opções para o PythonShell
let options = {
  mode: "text",  // 'text', 'json' ou 'binary'
  pythonPath: 'python',
  //pythonOptions: ['-u'], // Para obter os resultados do print em tempo real
  scriptPath: 'src/database/pyscripts/', // Caminho do script Python
};

// Função para executar o script Python
// Função para executar o script Python
const runPythonScript = async () => {
  try {
    // Executa o script Python
    const messages: string[] = await PythonShell.run('populatevacancypy.py', options);

    // Messages é uma lista de strings. Juntamos e analisamos como JSON
    const output = messages.join('\n');

    // Tenta analisar a saída como JSON
    const jsonResult = JSON.parse(output);

    // Cria uma instância do serviço de criação de vaga
    const createVacancyService = new CreateVacancyService();

    // Se jsonResult for uma lista de vagas
    if (Array.isArray(jsonResult)) {
      // Envia os dados ao serviço utilizando Promise.all para execução paralela
      const savedVacancies = await Promise.all(jsonResult.map(async (vacancy) => {
        try {
          return await createVacancyService.execute({
            webid: vacancy.id_da_vaga,
            title: vacancy.titulo_da_vaga,
            company_name: vacancy.nome_da_empresa,
            work_model: vacancy.modelo_trabalho,
            experience_title: vacancy.area_profissional,
            description: vacancy.descricao_da_vaga,
            skills : vacancy.habilidades,
            url: vacancy.url_da_vaga,
            city: vacancy.cidade_empresa,
            state: vacancy.estado_empresa,
            contract_type: vacancy.tipo_contrato,
            contract_period: vacancy.periodo_contrato,
            salary_max: vacancy.salario_max,
            salary: vacancy.salario_min,
            study_course_name: vacancy.escolaridade_min,
            language_course_name: vacancy.idioma,
            experience_period: vacancy.experiencia_desejada,
            pcd: vacancy.pcd,
            logo: vacancy.logo_empresa
          });
        } catch (error) {
          console.error(`Erro ao salvar vaga ${vacancy.titulo_da_vaga}:`, error);
          return null;  // Retorna null se houver erro, mas não interrompe o processamento
        }
      }));

      // Pegue o primeiro item do array para testar
      /*const vacancy = jsonResult[0];
      console.log('Vaga:', vacancy);

      try {
        // Cria a vaga com os dados do primeiro item do JSON
        const savedVacancies = await createVacancyService.execute({
          webid: vacancy.id_da_vaga,
          title: vacancy.titulo_da_vaga,
          company_name: vacancy.nome_da_empresa,
          work_model: vacancy.modelo_de_trabalho,
          description: vacancy.descricao_da_vaga,
          url: vacancy.url_da_vaga,
          city: vacancy.cidade_empresa,
          state: vacancy.estado_empresa,
          contract_type: vacancy.tipo_contrato,
          contract_period: vacancy.periodo_contrato,
          salary: vacancy.salario_min,
          salary_max: vacancy.salario_max,
          study_course_name: vacancy.escolaridade_min,
          language_course_name: vacancy.idioma,
          skills: vacancy.habilidades,
          experience_period: vacancy.experiencia_desejada,
          experience_title: vacancy.area_profissional
        });

        console.log('Vaga salva com sucesso:', savedVacancies);
        
      } catch (error) {
        console.error(`Erro ao salvar vaga ${vacancy.titulo_da_vaga}:`, error);
      }*/

      // Filtra e exibe somente as vagas que foram salvas com sucesso
      const successfulVacancies = savedVacancies.filter(vacancy => vacancy !== null);
      console.log('Vagas salvas com sucesso:', successfulVacancies);
    }

    console.log('Dados enviados para o banco de dados');
  } catch (error) {
    // Lida com possíveis erros globais
    console.error('Erro ao executar o script Python ou processar os dados:', error);
  }
};

// Executa a função
runPythonScript();
