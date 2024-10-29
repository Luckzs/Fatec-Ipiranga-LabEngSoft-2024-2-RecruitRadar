import { ListUnappliedVacancyService } from "../../services/Vacancy/ListUnappliedVacancyService";
const { PythonShell } = require("python-shell");
import { Request, Response } from "express";
import fs from "fs";
import path from "path";

interface Vacancy {
  id: string;
  title: string;
  // outras propriedades da vaga
}

class JobRecommendationController {
  async handle(request: Request, response: Response) {
    console.log(request.body);

    const candidateData = request.body.profileData;
    const location = request.body.location;
    const listUnappliedVacancyService = new ListUnappliedVacancyService();
    const unappliedVacancies = await listUnappliedVacancyService.execute(
      candidateData.User.email,
      location.latitude,
      location.longitude,
      candidateData.candidateObjectives[0].professional_area,
      candidateData.distance_radius * 1000
    );

    if (unappliedVacancies.length > 0) {
      // Caminhos dos arquivos temporários
      const candidateFilePath = path.join(__dirname, "candidateData.json");
      const vacanciesFilePath = path.join(__dirname, "unappliedVacancies.json");

      // Escreve os dados em arquivos temporários
      fs.writeFileSync(candidateFilePath, JSON.stringify(candidateData));
      fs.writeFileSync(vacanciesFilePath, JSON.stringify(unappliedVacancies));

      // Definindo opções para o PythonShell
      let options = {
        mode: "text",
        pythonPath: "python",
        pythonOptions: ["-u"], // Para obter os resultados do print em tempo real
        scriptPath: "src/database/pyscripts/",
        args: [candidateFilePath, vacanciesFilePath],
      };

      try {
        // Inicia o PythonShell com eventos para capturar stdout e stderr em tempo real
        const pyshell = new PythonShell("modelo_v3.py", options);



        // Captura erros (stderr) do script Python
        pyshell.on("stderr", (stderr: any) => {
          console.error("Erro no Python:", stderr);
        });

        // Espera o término do script
        pyshell.end((err: any, code: any, signal: any) => {
          if (err) {
            console.error("Erro ao finalizar o script Python:", err);
            return response
              .status(500)
              .json({ error: "Erro ao recomendar as vagas" });
          }
        });

        // Exibe as mensagens e recomendações ao final da execução
        pyshell.on("close", async () => {
          const output = (await PythonShell.run("modelo_v3.py", options)).join(
            "\n"
          );
          const recommendations = JSON.parse(output);

          //console.log("Recomendações do Python:", recommendations);

          // Cria um mapa para associar cada `id_vaga` ao `score`
          const recommendationMap = recommendations.reduce(
            (acc: { [key: string]: any }, item: any) => {
              acc[item.id_vaga] = item.score;
              return acc;
            },
            {}
          );

          // Filtra `unappliedVacancies` para obter apenas as vagas recomendadas e insere o `score` correspondente
          const recommendedVacancies = unappliedVacancies
            .filter((vaga: any) =>
              recommendations.some(
                (rec: any) => rec.id_vaga === vaga.vacancy_id
              )
            )
            .map((vaga: any) => ({
              ...vaga,
              score: recommendationMap[vaga.vacancy_id] || null,
            }))
            // Ordena em ordem decrescente pelo `score`
            .sort((a: any, b: any) => (b.score || 0) - (a.score || 0));

          // Exclui os arquivos temporários após o uso
          fs.unlinkSync(candidateFilePath);
          fs.unlinkSync(vacanciesFilePath);

          // Retorna as vagas recomendadas na resposta
          return response.status(200).json(recommendedVacancies);
        });
      } catch (error) {
        console.error("Erro ao executar o script Python:", error);
        return response
          .status(500)
          .json({ error: "Erro ao recomendar as vagas" });
      }
    } else {
      return response.status(404).json({
        error: "Nenhuma vaga encontrada para recomendação",
      });
    }
  }
}

export { JobRecommendationController };