import { Vacancy } from "../../entities/Vacancy";
import { connectionSource } from "../../config/ormconfig";
import { VacancyExperience } from "../../entities/VacancyExperience";
import { Experience } from "../../entities/Experience";
import { VacancyLanguage } from "../../entities/VacancyLanguage";
import { Language } from "../../entities/Language";
import { VacancySkill } from "../../entities/VacancySkill";
import { Skill } from "../../entities/Skill";
import { VacancyStudy } from "../../entities/VacancyStudy";
import { Study } from "../../entities/Study";

import axios from "axios";

interface IVacancyRequest {
  company_name: string;
  title: string;
  description: string;
  salary: string;
  salary_max: string;
  city: string;
  state: string;
  //address: string;                //TODO:Verificar como irá funcionar a geolocalização com as vagas so fornecendo essas informações
  //complement: string;
  //postal_code: string;
  //sex: string;
  pcd: boolean;
  work_model: string;
  webid: string;
  url: string;
  logo: string;
  contract_type: string;
  contract_period: string;
  professional_area: string;
  experience_title: string;
  experience_period: string;
  //language_level: string;
  //language_course_name: string;
  //skill_name: string;
  //study_situation: string;
  //study_start_date: Date;
  //study_completion_date: Date;
  study_course_name: string;
  //study_level: string;
  languages: { language: string; nivel: string }[]; // Tipo atualizado
  skills: string[];
}

// Função para fazer requisição ao OpenStreetMap (Nominatim) para obter lat/lng
const getCoordinatesFromCity = async (city: string, state: string) => {
  const apiUrl = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
    city
  )},${encodeURIComponent(state)}&format=json&limit=1`;

  try {
    const response = await axios.get(apiUrl);
    const data = response.data;

    if (data.length === 0) {
      throw new Error("Localização não encontrada");
    }

    const { lat, lon } = data[0]; // Obter lat e lon da resposta
    return { lat: parseFloat(lat), lon: parseFloat(lon) };
  } catch (error) {
    console.error("Erro ao buscar coordenadas:");
    return { lat: null, lon: null }; // Retorna null se houver erro na requisição
  }
};

function normalizeString(str: string | undefined): string {
  return str ? str.trim().replace(/\s+/g, " ") : "";
}

class CreateVacancyService {
  async execute(data: IVacancyRequest) {
    if (!data) {
      throw new Error("Invalid data");
    }

    // Normalizar todos os dados de entrada
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
      professional_area,
      experience_title,
      experience_period,
      languages,
      study_course_name,
      logo,
      pcd,
      skills,
    } = {
      company_name: normalizeString(data.company_name),
      title: normalizeString(data.title),
      description: normalizeString(data.description),
      professional_area: (data.professional_area),
      logo: data.logo,
      salary: data.salary,
      salary_max: data.salary_max,
      city: normalizeString(data.city),
      state: normalizeString(data.state),
      work_model: normalizeString(data.work_model),
      webid: data.webid,
      pcd: data.pcd,
      url: normalizeString(data.url),
      contract_type: normalizeString(data.contract_type),
      contract_period: normalizeString(data.contract_period),
      experience_title: normalizeString(data.experience_title),
      experience_period: normalizeString(data.experience_period),
      languages: data.languages,
      study_course_name: normalizeString(data.study_course_name),
      skills: data.skills,
    };

    const vacancyRepository = connectionSource.getRepository(Vacancy);
    const vacancyExperienceRepository =
      connectionSource.getRepository(VacancyExperience);
    const experienceRepository = connectionSource.getRepository(Experience);
    const vacancyLanguageRepository =
      connectionSource.getRepository(VacancyLanguage);
    const languageRepository = connectionSource.getRepository(Language);
    const vacancySkillRepository = connectionSource.getRepository(VacancySkill);
    const skillRepository = connectionSource.getRepository(Skill);
    const vacancyStudyRepository = connectionSource.getRepository(VacancyStudy);
    const studyRepository = connectionSource.getRepository(Study);

    // Verificar se a vaga já existe
    const vacancyAlreadyExists = await vacancyRepository.findOne({
      where: {
        webid: webid,
        title: title,
        company_name: company_name,
      },
    });

    if (vacancyAlreadyExists) {
      console.log(`Vaga já existe: ${title} - ${company_name}`);
      return;
    }

    // Buscar as coordenadas de latitude e longitude usando OpenStreetMap
    const { lat, lon } = await getCoordinatesFromCity(city, state);

    //TODO:VALIDAR SE A CRIAÇÃO DE VAGA ESTA SENDO FEITO CORRETA SE NAO ESTA BLOQUEANDO NADA
    // Criar a vag
    const vacancy = vacancyRepository.create({
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
      professional_area,
      pcd,
      logo,
      ...(lat !== null && lon !== null
        ? {
            latitude: lat.toString(),
            longitude: lon.toString(),
            position: { type: "Point", coordinates: [lon, lat] },
          }
        : {}),
    });

    await vacancyRepository.save(vacancy);

    // Adicionar Experiência necessária para vaga
    if (
      experience_period &&
      experience_period.toLowerCase() !== "não informado"
    ) {
      const normalizedexperience_title = normalizeString(experience_title);

      // Verificar se a experiência já existe
      let experience = await experienceRepository.findOne({
        where: { title: normalizedexperience_title },
      });

      // Se a experiência não existe, cria e salva
      if (!experience) {
        experience = experienceRepository.create({
          title: normalizedexperience_title,
        });

        try {
          await experienceRepository.save(experience, {
            reload: true, // Recarregar para garantir que os dados estejam atualizados
          });
        } catch (error: any) {
          if (error.code === "23505") {
            // Código de erro para violação de chave única no PostgreSQL
            console.log(`Experiência já existe: ${normalizedexperience_title}`);
            experience = await experienceRepository.findOne({
              where: { title: normalizedexperience_title },
            });
          } else {
            throw error; // Re-lançar outros erros
          }
        }
      }

      // Verificação para garantir que 'experience' não é nulo
      if (experience) {
        // Criar a relação VacancyExperience, independente de a experiência ser nova ou já existente
        const vacancyExperience = vacancyExperienceRepository.create({
          vacancy_id: vacancy.vacancy_id,
          period:
            experience_period.toLowerCase() === "sem experiência"
              ? "0"
              : experience_period,
          experience_id: experience.experience_id, // Usar o ID da experiência existente ou recém-criada
        });

        // Salvar a associação entre a vaga e a experiência
        await vacancyExperienceRepository.save(vacancyExperience);
      } else {
        console.error("Falha ao obter ou criar a experiência");
      }
    }

    // Adicionar Formação acadêmica necessárias para vaga
    if (
      study_course_name &&
      study_course_name.toLowerCase() !== "não informado"
    ) {
      // Normalizar o nome do curso
      const normalizedStudyCourseName = normalizeString(study_course_name);

      // Verificar se a formação já existe no banco de dados
      let study = await studyRepository.findOne({
        where: { education: normalizedStudyCourseName }, // Usar o nome normalizado para buscar
      });

      if (!study) {
        // Se não existe, criar uma nova formação
        study = studyRepository.create({
          education: normalizedStudyCourseName, // Usar o nome normalizado para buscar
        });

        try {
          await studyRepository.save(study, {
            reload: true,
          });
        } catch (error: any) {
          if (error.code === "23505") {
            // Código de erro para violação de chave única no PostgreSQL
            console.log(`Formação já existe: ${normalizedStudyCourseName}`);
            study = await studyRepository.findOne({
              where: { education: normalizedStudyCourseName }, // Usar o nome normalizado para buscar
            });
          } else {
            throw error; // Re-lançar outros erros
          }
        }
      }

      // Agora, vincular a formação à vaga
      if (study) {
        const vacancyStudy = vacancyStudyRepository.create({
          vacancy_id: vacancy.vacancy_id,
          study_id: study.study_id,
        });

        await vacancyStudyRepository.save(vacancyStudy);
      } else {
        console.error("Falha ao obter ou criar a formação");
      }
    }

    //TODO:VALIDAR SE A HABILIDADE ESTA SENDO INSERIDA DE MANEIRA CORRETA
    // Adicionar Habilidades necessárias para vaga
    if (skills && skills.length > 0) {
      for (let i = 0; i < skills.length; i++) {
        const skillText = normalizeString(skills[i]); // Normalizando a string da habilidade

        if (skillText && skillText !== "Habilidades não identificadas") {
          let skill = await skillRepository.findOne({
            where: { text: skillText },
          });

          if (!skill) {
            skill = skillRepository.create({
              text: skillText,
            });

            try {
              await skillRepository.save(skill, {
                reload: true,
              });
            } catch (error: any) {
              if (error.code === "23505") {
                // Código de erro para violação de chave única no PostgreSQL
                console.log(`Habilidade já existe: ${skillText}`);
                skill = await skillRepository.findOne({
                  where: { text: skillText },
                });
              } else {
                throw error; // Re-lançar outros erros
              }
            }

            if (skill) {
              const vacancySkill = vacancySkillRepository.create({
                vacancy_id: vacancy.vacancy_id,
                skill_id: skill.skill_id,
              });

              await vacancySkillRepository.save(vacancySkill);
            } else {
              console.error("Falha ao obter ou criar a habilidade");
            }
          }
        }
      }
    }

    // Adicionar Linguagem necessária para vaga
    if (languages && languages.length > 0) {
      for (let i = 0; i < languages.length; i++) {
        // Extrai diretamente `language` e `nivel` de cada objeto em `languages`
        let languageName = normalizeString(languages[i].language); // Nome do idioma
        let languageLevel = normalizeString(languages[i].nivel || "Básico"); // Nível do idioma com padrão "Básico" caso não esteja definido

        // Verifica se o nome do idioma é válido
        if (languageName && languageName.toLowerCase() !== "não informado") {
          // Procura o idioma no repositório
          let language = await languageRepository.findOne({
            where: { course_name: languageName },
          });

          // Cria o idioma se não existir
          if (!language) {
            language = languageRepository.create({
              course_name: languageName,
            });

            try {
              await languageRepository.save(language, {
                reload: true,
              });
            } catch (error: any) {
              if (error.code === "23505") {
                // Código de erro para violação de chave única no PostgreSQL
                console.log(`Idioma já existe: ${languageName}`);
                language = await languageRepository.findOne({
                  where: { course_name: languageName },
                });
              } else {
                throw error; // Re-lançar outros erros
              }
            }
          }

          if (language) {
            const vacancyLanguage = vacancyLanguageRepository.create({
              vacancy_id: vacancy.vacancy_id,
              level: languageLevel,
              language_id: language.language_id,
            });

            await vacancyLanguageRepository.save(vacancyLanguage);
          } else {
            console.error("Falha ao obter ou criar a linguagem");
          }
        }
      }
    }

    return vacancy;
  }
}

export { CreateVacancyService };
