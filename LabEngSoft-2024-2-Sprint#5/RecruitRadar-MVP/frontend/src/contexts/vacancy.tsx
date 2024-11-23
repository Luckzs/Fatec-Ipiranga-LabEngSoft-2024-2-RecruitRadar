// VacancyContext.tsx
import React, { createContext, useState, useContext, ReactNode } from "react";

interface VacancyData {
    vacancy_id: string;
    webid: string;
    title: string;
    company_name: string;
    city: string;
    state: string;
    description: string;
    salary: string;
    salary_max: string;
    created_at: string; // Data no formato ISO
    //address: string;
    //complement: string;
    //postal_code: string;
    //sex: string;
    logo: string;
    pcd: boolean;
    work_model: string;
    url: string;
    contract_type: string;
    contract_period: string;
    vacancyExperience: vacancyExperience[];
    vacancyLanguage: vacancyLanguage[];
    vacancySkill: vacancySkill[];
    vacancyStudy: vacancyStudy[];
    match: Match[];
  }

  interface Match {
    match_id: string;
    score: number;
  }
  
  interface vacancyExperience {
    vacancy_experience_id: string;
    period: string;
    Experience: Experience;
  }
  
  interface vacancyLanguage {
    vacancy_language_id: string;
    level: string;
    Language: Language;
  }
  
  interface vacancySkill {
    vacancy_skill_id: string;
    Skill: Skill;
  }
  
  interface vacancyStudy {
    vacancy_study_id: string;
    start_date: string; // Data no formato ISO
    completion_date: string; // Data no formato ISO
    situation: string;
    Study: Study;
  }

  interface Experience {
    title: string;
    // Adicione outros campos necessários
  }
  
  interface Language {
    course_name: string;
  }
  
  interface Skill {
    text: string;
    // Adicione outros campos necessários
  }
  
  interface Study {
    education: string;
    // Adicione outros campos necessários
  }
  

interface VacancyContextType {
  vacancyData: VacancyData[];
  setVacancyData: React.Dispatch<React.SetStateAction<VacancyData[]>>;
}

const VacancyContext = createContext<VacancyContextType | undefined>(undefined);

interface VacancyProviderProps {
  children: ReactNode;
}

export const VacancyProvider: React.FC<VacancyProviderProps> = ({ children }) => {
  const [vacancyData, setVacancyData] = useState<VacancyData[]>([]);

  return (
    <VacancyContext.Provider value={{ vacancyData, setVacancyData }}>
      {children}
    </VacancyContext.Provider>
  );
};

export const useVacancy = (): VacancyContextType => {
  const context = useContext(VacancyContext);
  if (!context) {
    throw new Error("useVacancy must be used within a VacancyProvider");
  }
  return context;
};
