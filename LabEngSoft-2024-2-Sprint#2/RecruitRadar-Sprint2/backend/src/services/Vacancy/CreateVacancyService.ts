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
    //pcd: boolean;
    work_model: string;
    webid: string;
    url: string;
    contract_type: string;
    contract_period: string;
    experience_title: string;
    experience_period: string;
    //language_level: string;
    language_course_name: string;
    //skill_name: string;
    //study_situation: string;
    //study_start_date: Date;
    //study_completion_date: Date;
    study_course_name: string;
    //study_level: string;
    skills: string[];
}

function normalizeString(str: string): string {
    return str.trim().replace(/\s+/g, ' ');
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
            experience_title,
            experience_period,
            language_course_name,
            study_course_name,
            skills
        } = {
            company_name: normalizeString(data.company_name),
            title: normalizeString(data.title),
            description: normalizeString(data.description),
            salary: data.salary,
            salary_max: data.salary_max,
            city: normalizeString(data.city),
            state: normalizeString(data.state),
            work_model: normalizeString(data.work_model),
            webid: (data.webid),
            url: normalizeString(data.url),
            contract_type: normalizeString(data.contract_type),
            contract_period: normalizeString(data.contract_period),
            experience_title: normalizeString(data.experience_title),
            experience_period: normalizeString(data.experience_period),
            language_course_name: normalizeString(data.language_course_name),
            study_course_name: normalizeString(data.study_course_name),
            skills: data.skills
        };
        const vacancyRepository = connectionSource.getRepository(Vacancy);
        const vacancyExperienceRepository = connectionSource.getRepository(VacancyExperience);
        const experienceRepository = connectionSource.getRepository(Experience);
        const vacancyLanguageRepository = connectionSource.getRepository(VacancyLanguage);
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
                company_name: company_name
            },
        });


        if (vacancyAlreadyExists) {
            console.log(`Vaga já existe: ${title} - ${company_name}`);
            return;
        }

        // Criar a vaga
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
            contract_period
        });

        await vacancyRepository.save(vacancy);

        // Adicionar Experiência necessária para vaga
        if (experience_period && experience_period.toLowerCase() !== "não informado") {
            let experience = await experienceRepository.findOne({
                where: { title: experience_title },
            });

            if (!experience) {
                experience = experienceRepository.create({
                    title: experience_title,
                });

                await experienceRepository.save(experience);
            }

            const vacancyExperience = vacancyExperienceRepository.create({
                vacancy_id: vacancy.vacancy_id,
                period: experience_period.toLowerCase() === "sem experiência" ? "0" : experience_period,
                experience_id: experience.experience_id,
            });

            await vacancyExperienceRepository.save(vacancyExperience);
        }

        // Adicionar Linguagem necessária para vaga
        if (language_course_name && language_course_name.toLowerCase() !== "não informado") {
            let languageName = language_course_name;
            let languageLevel = "Básico";

            const regex = /([^\(\)]+)(?:\(([^)]+)\))?/;
            const match = regex.exec(language_course_name);

            if (match) {
                languageName = normalizeString(match[1].trim());
                languageLevel = match[2] ? normalizeString(match[2].trim()) : "básico";
            }

            let language = await languageRepository.findOne({
                where: { course_name: languageName },
            });

            if (!language) {
                language = languageRepository.create({
                    course_name: languageName,
                });
                await languageRepository.save(language);
            }

            const vacancyLanguage = vacancyLanguageRepository.create({
                vacancy_id: vacancy.vacancy_id,
                level: languageLevel,
                language_id: language.language_id,
            });

            await vacancyLanguageRepository.save(vacancyLanguage);
        }

        // Adicionar Formação acadêmica necessárias para vaga
        if (study_course_name && study_course_name.toLowerCase() !== "não informado") {
            let study = await studyRepository.findOne({
                where: { education: study_course_name },
            });

            if (!study) {
                study = studyRepository.create({
                    education: study_course_name,
                });

                await studyRepository.save(study);
            }

            const vacancyStudy = vacancyStudyRepository.create({
                vacancy_id: vacancy.vacancy_id,
                study_id: study.study_id,
            });

            await vacancyStudyRepository.save(vacancyStudy);
        }

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

                        await skillRepository.save(skill);
                    }

                    const vacancySkill = vacancySkillRepository.create({
                        vacancy_id: vacancy.vacancy_id,
                        skill_id: skill.skill_id,
                    });

                    await vacancySkillRepository.save(vacancySkill);
                }
            }
        }

        return vacancy;
    }
}

export { CreateVacancyService };
