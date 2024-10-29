import React, { useCallback, useEffect, useState } from "react";
import { View, Text, FlatList, Image } from "react-native";
import { styles } from "./styles";
import Navbar from "../../components/Navbar";
import api from "../../services/api";
import useAsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";

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
  Match: Match;
}
interface Match {
  match_id: string;
  score: number;
  applied: boolean;
  updated_at: string;
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

interface User {
  email: string;
  // Adicione outros campos necessários
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

type CandidaturaCardProps = {
  title: string;
  companyName: string;
  dateApplied: string;
  logoUrl: string;
};

const CandidaturaCard: React.FC<CandidaturaCardProps> = ({
  title,
  companyName,
  dateApplied,
  logoUrl,
}) => {
  const logoUri =
    logoUrl && logoUrl !== "Sem logo"
      ? { uri: logoUrl }
      : require("../../assets/detsoft.png"); // Substitua pelo caminho da sua imagem padrão

  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <Image
          source={logoUri} // Usa a logo ou a imagem padrão
          style={styles.companyLogo}
        />
        <View style={styles.info}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.companyName}>{companyName}</Text>
          <Text style={styles.dateApplied}>{dateApplied}</Text>
        </View>
      </View>
    </View>
  );
};

const Applications = () => {
  const [vacancyData, setVacancyData] = useState<VacancyData[]>([]);

  const fetchAppliedVacancyData = async () => {
    try {
      const email = await useAsyncStorage
        .getItem("@RRAuth:user")
        .then((response) => {
          return JSON.parse(response || "{}").email;
        });
      const response = await api.get(`/application/${email}`);

      const vacancyArray = Array.isArray(response.data)
        ? response.data
        : [response.data];
      setVacancyData(vacancyArray);
    } catch (error: any) {
      console.error("Erro ao buscar Matchs", error.response.data.error);
    }
  };

  useEffect(() => {
    fetchAppliedVacancyData();
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchAppliedVacancyData();
    }, [])
  );

  const data = [
    {
      id: "1",
      title: "Software Engineer",
      companyName: "Detsoft",
      dateApplied: "Candidatou-se há 3 dias",
      logoUrl: "../../assets/detsoft.png",
    },
    {
      id: "2",
      title: "Product Owner",
      companyName: "Detsoft",
      dateApplied: "Candidatou-se há 5 dias",
      logoUrl: "../../assets/detsoft.png",
    },
    {
      id: "3",
      title: "Contador(a)",
      companyName: "Detsoft",
      dateApplied: "Candidatou-se há 1 semana",
      logoUrl: "../../assets/detsoft.png",
    },
  ];


  return (
    <View style={styles.container}>
      <FlatList
        data={vacancyData}
        keyExtractor={(item) => item.vacancy_id}
        ListHeaderComponent={
          <Text style={styles.headerTitle}>Minhas candidaturas</Text>
        }
        renderItem={({ item }) => {
          const base64Logo =
            item.logo !== "Sem logo"
              ? `data:image/jpeg;base64,${item.logo}`
              : "Sem logo"; // Decodificando logo

          return (
            <CandidaturaCard
              key={item.vacancy_id}
              title={item.title}
              companyName={item.company_name}
              dateApplied={item.Match.updated_at} // Formatando a data
              logoUrl={base64Logo}
            />
            
          );
        }}
      />

        <Navbar newApplication={false} />
    </View>
  );
};

export default Applications;
