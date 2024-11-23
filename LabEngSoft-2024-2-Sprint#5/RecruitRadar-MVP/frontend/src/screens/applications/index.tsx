import React, { useCallback, useEffect, useState } from "react";
import { View, Text, FlatList, Image, ActivityIndicator } from "react-native";
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
  Match: Match[];
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
      //console.log("Matchs",  JSON.stringify(vacancyArray, null, 2));
    } catch (error: any) {
      console.error("Erro ao buscar Matchs", error.response.data.error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchAppliedVacancyData();
    }, [])
  );
  if (!vacancyData) {
    return (
      <View style={styles.loadingContainer}>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size="large" color="#999" />
        </View>
      </View>
    );
  }
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
              dateApplied={`Inscrição feita em: ${new Date(
                item.Match[0].updated_at
              ).toLocaleDateString("pt-BR")}`} // Formatando a data
              logoUrl={base64Logo}
            />
            
          );
        }}
      />

        <Navbar newApplication={false} onBeforeNavigate={(callback) => {callback();}} />
    </View>
  );
};

export default Applications;
