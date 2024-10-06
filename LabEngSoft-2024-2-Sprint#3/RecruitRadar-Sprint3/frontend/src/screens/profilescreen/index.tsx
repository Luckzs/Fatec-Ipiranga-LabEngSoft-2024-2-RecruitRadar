import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import { styles } from "./styles";
import {
  RouteProp,
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import React, { useCallback, useEffect } from "react";
import logoSmall from "../../assets/LogoSmall.png";
import {
  Ionicons,
  FontAwesome5,
  MaterialIcons,
  Feather,
} from "@expo/vector-icons";
import api from "../../services/api";
import useAsyncStorage from "@react-native-async-storage/async-storage";
import { format } from "path";
import { useAuth } from "../../contexts/auth";

interface User {
  email: string;
  // Adicione outros campos necessários
}

interface ProfileData {
  candidate_id: string;
  full_name: string;
  distance_radius: number;
  sex: string;
  CPF: string;
  pcd: boolean;
  birth_date: string; // Data no formato ISO
  address: string;
  city: string;
  state: string;
  postal_code: string;
  candidateExperiences: CandidateExperience[];
  candidateLanguages: CandidateLanguage[];
  candidateObjectives: CandidateObjective[];
  candidateSkills: CandidateSkill[];
  candidateStudies: CandidateStudy[];
  User: User;
}

interface Experience {
  title: string;
  // Adicione outros campos necessários
}

interface CandidateExperience {
  candidate_experience_id: string;
  company_name: string;
  start_date: string; // Data no formato ISO
  end_date: string; // Data no formato ISO
  period: string;
  Experience: Experience;
}

interface Language {
  course_name: string;
  // Adicione outros campos necessários
}

interface CandidateLanguage {
  candidate_language_id: string;
  level: string;
  Language: Language;
}

interface CandidateObjective {
  candidate_objective_id: string;
  job: string;
  work_model: string;
  salary_expectation: number;
}

interface Skill {
  text: string;
  // Adicione outros campos necessários
}

interface CandidateSkill {
  candidate_skill_id: string;
  Skill: Skill;
}

interface Study {
  education: string;
  // Adicione outros campos necessários
}

interface CandidateStudy {
  candidate_study_id: string;
  course_name: string;
  institution_name: string;
  start_date: string; // Data no formato ISO
  completion_date: string; // Data no formato ISO
  situation: string;
  Study: Study;
}

// Função para formatar a data
function formatDate(dateString: string): string {
  const date = new Date(dateString);

  // Exemplo de formatação: "25 abr 2001"
  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "short",
    year: "numeric",
  };
  return date.toLocaleDateString("pt-BR", options); 
}

  // Definindo o tipo de navegação e rotas
  type RootStackParamList = {
    profileScreen: { profileData: ProfileData };
  };

  // Definindo o tipo da rota
  type profileScreenRouteProp = RouteProp<
    RootStackParamList,
    "profileScreen"
  >;

export function ProfileScreen() {
  const route = useRoute<profileScreenRouteProp>(); // Obtendo os parâmetros da rota
  const navigation = useNavigation<any>();
  const { signOut } = useAuth();

  const { profileData } = route.params;

  const [profileDataState, setProfileDataState] = React.useState<ProfileData | null>(profileData);

  useEffect(() => {
    if (profileData) {
      setProfileDataState(profileData);
    }
  }, [profileData]);

 /*    const [profileData, setProfileData] = React.useState<ProfileData | null>(
    null
  ); // Estado para armazenar os dados do perfil
 const fetchProfileData = async () => {
    try {
      const email = await useAsyncStorage
        .getItem("@RRAuth:user")
        .then((response) => {
          return JSON.parse(response || "{}").email;
        });
      const response = await api.get(`/candidate/${email}`);
      console.log(JSON.stringify(response.data, null, 2));
      setProfileData(response.data);
    } catch (error) {
      console.error("Erro ao buscar dados do perfil:", error);
    }
  };

  UseEffect para buscar dados inicialmente
  useEffect(() => {
    fetchProfileData();
  }, []);

  // UseFocusEffect para atualizar os dados quando a tela de perfil ganhar foco
  useFocusEffect(
    useCallback(() => {
      fetchProfileData();
    }, [])
  );*/

  const handleNav = () => {
    navigation.goBack();
  };

  const handleEditCandidatePress = () => {
    console.log("Editar perfil");
    navigation.navigate("editCandidate", { profileData });
  };

  const handleEditPreferencesPress = () => {
    console.log("Editar preferências");
    navigation.navigate("editCandidateObjectives", { profileData });
  };

  const handleEditStudiesPress = () => {
    console.log("Editar estudos");
    navigation.navigate("editCandidateStudies", { profileData });
  };

  const handleEditExperiencesPress = () => {
    console.log("Editar experiências");
    navigation.navigate("editCandidateExperiences", { profileData });
  };

  const handleEditSkillsPress = () => {
    console.log("Editar competências");
    navigation.navigate("editCandidateSkills", { profileData });
  };

  const handleEditLanguagesPress = () => {
    console.log("Editar linguagens");
    navigation.navigate("editCandidateLanguages", { profileData });
    // Navegar para a tela de edição de linguagens
  };

  const handleSettingsPress = () => {
    console.log("Abrir configurações");
    navigation.navigate("settings", { profileData }); // Navega para a tela de configurações
  };

  function handleSignOut() {
    Alert.alert("Confirmação", "Você tem certeza que deseja sair?", [
      {
        text: "Cancelar",
        style: "cancel",
      },
      {
        text: "Sair",
        onPress: () => {
          // Chame a função signOut apenas se o usuário confirmar
          signOut();
        },
        style: "destructive",
      },
    ]);
  }

  if (!profileData) {
    return <Text>Loading...</Text>; // Exibe um texto de carregamento enquanto os dados são buscados
  }
  return (
    <ScrollView style={styles.container}>
      {/* Botão de Retorno */}
      <TouchableOpacity style={styles.backButton} onPress={handleNav}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>

      {/* Botão de Configurações */}
      <TouchableOpacity
        style={styles.settingsButton}
        onPress={handleSettingsPress}
      >
        <Ionicons name="settings-outline" size={24} color="black" />
      </TouchableOpacity>

      <View style={styles.titlePrimaryContainer}>
        <Text style={styles.titlePrimary}>Recruit </Text>
        <Image source={logoSmall} style={styles.logo} resizeMode="stretch" />
        <Text style={styles.titlePrimary}> Radar</Text>
      </View>

      <View style={styles.content}>
        {/* Cabeçalho com o nome */}
        <View style={styles.preferencesContainer}>
          <View style={styles.header}>
            <Text style={styles.title}>{profileData.full_name}</Text>
            <TouchableOpacity
              onPress={handleEditCandidatePress}
              style={styles.editButton}
            >
              <Feather name="edit-3" size={20} color="black" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Informações do perfil */}
        <View style={styles.section}>
          {/* CPF */}
          <View style={styles.positionItem}>
            <FontAwesome5
              name="id-card"
              size={20}
              color="black"
              style={styles.imageLogo}
            />
            <Text style={styles.text}>{profileData.CPF}</Text>
          </View>
          {/* Data de nascimento */}
          <View style={styles.positionItem}>
            <Ionicons
              name="calendar-outline"
              size={20}
              color="black"
              style={styles.imageLogo}
            />
            <Text style={styles.text}>
              {" "}
              {formatDate(profileData.birth_date)}
            </Text>
          </View>

          {/* Sexo */}
          <View style={styles.positionItem}>
            <Ionicons
              name="person-outline"
              size={20}
              color="black"
              style={styles.imageLogo}
            />
            <Text style={styles.text}>{profileData.sex}</Text>
          </View>

          {/* PCD */}
          <View style={styles.positionItem}>
            <MaterialIcons
              name="accessible"
              size={20}
              color="black"
              style={styles.imageLogo}
            />
            <Text style={styles.text}>{profileData.pcd ? "Sim" : "Não"}</Text>
          </View>

          {/* Email */}
          <View style={styles.positionItem}>
            <MaterialIcons
              name="email"
              size={20}
              color="black"
              style={styles.imageLogo}
            />
            <Text style={styles.text}>{profileData.User.email}</Text>
          </View>

          {/* Telefone 
          <View style={styles.positionItem}>
            <Feather name="phone" size={20} color="black" style={styles.imageLogo} />
            <Text style={styles.text}>(11) 99664-6475</Text>
          </View>*/}

          {/* Endereço */}
          <View style={styles.positionItem}>
            <Ionicons
              name="location-outline"
              size={20}
              color="black"
              style={styles.imageLogo}
            />
            <Text style={styles.text}>{profileData.address}</Text>
          </View>
        </View>

        {/* Preferências do candidato */}
        <View style={styles.preferencesContainer}>
          <Text style={styles.preferencesubtitle}>Preferências</Text>
          <TouchableOpacity
            onPress={handleEditPreferencesPress}
            style={styles.editButton}
          >
            <Feather name="edit-3" size={20} color="black" />
          </TouchableOpacity>
        </View>

        <Text style={styles.subtitle}>Cargo</Text>
        <View style={styles.pereferencessection}>
          {/* Exibir Cargos */}
          {profileData.candidateObjectives.map((obj) => (
            <View key={obj.candidate_objective_id} style={styles.studyItem}>
              <Text style={styles.studyText}>{obj.job}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.subtitle}>Pretensão salarial</Text>
        {/* Exibir Pretensão Salarial */}
        <View style={styles.pereferencessection}>
          {profileData.candidateObjectives.map((obj) => (
            <View key={obj.candidate_objective_id} style={styles.studyItem}>
              <Text style={styles.studyText}>R${obj.salary_expectation}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.subtitle}>Preferência de distância</Text>
        {/* Exibir Preferência de Distância */}
        <View style={styles.pereferencessection}>
          <View style={styles.studyItem}>
            <Text style={styles.studyText}>
              {profileData.distance_radius} km
            </Text>
          </View>
        </View>

        <Text style={styles.subtitle}>Modelo de trabalho</Text>
        <View style={styles.section}>
          {/* Exibir Modelos de Trabalho */}
          {profileData.candidateObjectives.map((obj) => (
            <View key={obj.candidate_objective_id} style={styles.studyItem}>
              <Text style={styles.studyText}>{obj.work_model}</Text>
            </View>
          ))}
        </View>

        <View style={styles.preferencesContainer}>
          <Text style={styles.preferencesubtitle}>Formação Acadêmica</Text>
          <TouchableOpacity
            onPress={handleEditStudiesPress}
            style={styles.editButton}
          >
            <Feather name="edit-3" size={20} color="black" />
          </TouchableOpacity>
        </View>
        <View style={styles.section}>
          <View style={styles.studyList}>
            {profileData.candidateStudies.map((study) => (
              <View key={study.candidate_study_id} style={styles.studyItem}>
                <Text style={styles.studyText}>{study.course_name}</Text>
                <Text style={styles.studyText}>{study.institution_name}</Text>
                <Text style={styles.dateText}>
                  {formatDate(study.start_date)} -{" "}
                  {formatDate(study.completion_date)}
                </Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.preferencesContainer}>
          <Text style={styles.preferencesubtitle}>Experiências</Text>
          <TouchableOpacity
            onPress={handleEditExperiencesPress}
            style={styles.editButton}
          >
            <Feather name="edit-3" size={20} color="black" />
          </TouchableOpacity>
        </View>
        <View style={styles.section}>
          <View style={styles.studyList}>
            {profileData.candidateExperiences.map((exp) => (
              <View key={exp.candidate_experience_id} style={styles.studyItem}>
                <Text style={styles.studyText}>
                  {exp.company_name} - {exp.Experience.title}
                </Text>
                <Text style={styles.dateText}>
                  {formatDate(exp.start_date)} - {formatDate(exp.end_date)}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Competências */}
        <View style={styles.preferencesContainer}>
          <Text style={styles.preferencesubtitle}>Competências</Text>
          <TouchableOpacity
            onPress={handleEditSkillsPress}
            style={styles.editButton}
          >
            <Feather name="edit-3" size={20} color="black" />
          </TouchableOpacity>
        </View>
        <View style={styles.section}>
          <View style={styles.studyList}>
            {profileData.candidateSkills.map((skill) => (
              <View key={skill.candidate_skill_id} style={styles.studyItem}>
                <Text style={styles.studyText}>{skill.Skill.text}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Linguagens */}
        <View style={styles.preferencesContainer}>
          <Text style={styles.preferencesubtitle}>Linguagens</Text>
          <TouchableOpacity
            onPress={handleEditLanguagesPress}
            style={styles.editButton}
          >
            <Feather name="edit-3" size={20} color="black" />
          </TouchableOpacity>
        </View>
        <View style={styles.studyList}>
          {profileData.candidateLanguages.map((lang) => (
            <View key={lang.candidate_language_id} style={styles.studyItem}>
              <Text style={styles.studyText}>
                {lang.Language.course_name}: {lang.level}
              </Text>
            </View>
          ))}
        </View>

        {/* Botão de Sair */}
        <View style={styles.refreshButtonContainer}>
          <TouchableOpacity
            style={styles.refreshButton}
            onPress={handleSignOut}
          >
            <Text style={styles.buttonText}>Sair</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
