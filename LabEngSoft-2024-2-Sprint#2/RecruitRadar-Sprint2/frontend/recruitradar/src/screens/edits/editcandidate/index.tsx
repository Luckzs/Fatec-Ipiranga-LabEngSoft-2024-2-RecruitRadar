import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import { styles } from "./styles";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect } from "react";
import logoSmall from "../../../assets/LogoSmall.png";
import {
  Ionicons,
  FontAwesome5,
  MaterialIcons,
  Feather,
} from "@expo/vector-icons";
import useAsyncStorage from "@react-native-async-storage/async-storage";
import { format } from "path";
import api from "../../../services/api";
import { TextInput } from "react-native-gesture-handler";
import getLocationInfo from "../../../services/location";

interface User {
  email: string;
  // Adicione outros campos necessários
}

interface ProfileData {
  candidate_id: string;
  full_name: string;
  distance_radius: number;
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
  course_name: string;
  level: string;
  // Adicione outros campos necessários
}

interface CandidateStudy {
  candidate_study_id: string;
  institution_name: string;
  start_date: string; // Data no formato ISO
  completion_date: string; // Data no formato ISO
  Study: Study;
}

// Definindo o tipo de navegação e rotas
type RootStackParamList = {
  EditCandidateScreen: { profileData: ProfileData };
};

// Definindo o tipo da rota
type EditCandidateScreenRouteProp = RouteProp<
  RootStackParamList,
  "EditCandidateScreen"
>;

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

interface LocationInfo {
  address: string;
  city: string;
  state: string;
  postal_code: string;
}

export function EditCandidateScreen() {
  const route = useRoute<EditCandidateScreenRouteProp>(); // Obtendo os parâmetros da rota
  // Obtendo os parâmetros da rota
  const navigation = useNavigation<any>();

  const { profileData } = route.params;

  const [profileDataState, setProfileDataState] =
    React.useState<ProfileData | null>(profileData);

  const [CEP, setCEP] = React.useState(String);
  const [endereco, setEndereco] = React.useState(String);
  const [city, setCity] = React.useState(String);
  const [state, setState] = React.useState(String);
  const [postal_code, setPostalCode] = React.useState(String);

  useEffect(() => {
    if (profileData) {
      setProfileDataState(profileData);
    }
  }, [profileData]);

  const handleNav = () => {
    navigation.goBack();
  };

  const handleSavePress = () => {
    console.log("Salvar alterações");

    const profileLocation = {
      candidate_id: profileData.candidate_id,
      address: endereco,
      city: city,
      state: state,
      postal_code: postal_code,
    };

    console.log(profileLocation);

    api
      .put(`/candidate`, { profileLocation })
      .then((response) => {
        console.log(response.data);
        Alert.alert("Sucesso", "Perfil atualizado com sucesso!");
        navigation.navigate("Home");
      })
      .catch((error) => {
        console.error(error);
        Alert.alert(
          "Erro",
          "Erro ao atualizar perfil. Detalhes: " + error.response.data.error
        );
      });
  };

  const onChangeCEP = async () => {
    const cep = CEP.replace(/\D/g, "");
    if (cep.length !== 8) {
      Alert.alert("Erro", "Por favor, insira um CEP válido com 8 dígitos.");
      return;
    }
    try {
      const locInfo: LocationInfo = await getLocationInfo(cep);
      if (!locInfo || !locInfo.address) {
        Alert.alert(
          "Erro",
          "CEP não encontrado. Por favor, insira um CEP válido."
        );
        return;
      }
      setEndereco(locInfo.address);
      setCity(locInfo.city);
      setState(locInfo.state);
      setPostalCode(locInfo.postal_code);
    } catch (error) {
      Alert.alert(
        "Erro",
        "CEP não encontrado. Por favor, insira um CEP válido. Detalhes:" + error
      );
      console.log(error);
    }
  };

  if (!profileData) {
    return <Text>Loading...</Text>; // Exibe um texto de carregamento enquanto os dados são buscados
  }
  return (
    <ScrollView style={styles.container}>
      {/* Botão de Retorno */}
      <TouchableOpacity style={styles.backButton} onPress={handleNav}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>

      <View style={styles.content}>
        <Image
          source={logoSmall}
          style={styles.imageLogo}
          resizeMode="stretch"
        />

        {/* Cabeçalho com o nome */}

        <View style={styles.header}>
          <Text style={styles.title}>{profileData.full_name}</Text>
        </View>

        {/* Informações do perfil */}
        <View style={styles.section}>
          {/* CPF */}
          <View style={styles.readpositionItem}>
            <FontAwesome5
              name="id-card"
              size={20}
              color="black"
              style={styles.imageLogo}
            />
            <Text style={styles.text}>{profileData.CPF}</Text>
          </View>
          {/* Data de nascimento */}
          <View style={styles.readpositionItem}>
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

          {/* Email */}
          <View style={styles.readpositionItem}>
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

          <View style={styles.positionItem}>
            <Ionicons
              name="location-outline"
              size={20}
              color="black"
              style={styles.imageLogo}
            />
            <TextInput
              style={styles.input}
              placeholder={profileData.postal_code}
              value={CEP}
              onChangeText={(text) => setCEP(text)}
              onBlur={onChangeCEP}
            />
          </View>
          <View style={styles.positionItem}>
            <Ionicons
              name="location-outline"
              size={20}
              color="black"
              style={styles.imageLogo}
            />
            <TextInput
              style={styles.input}
              multiline
              placeholder={profileData.address}
              value={endereco}
            />
          </View>

          <View style={styles.readpositionItem}>
            <Ionicons
              name="location-outline"
              size={20}
              color="black"
              style={styles.imageLogo}
            />
            <TextInput
              style={styles.text}
              multiline
              placeholder={profileData.city}
              value={city}
            />
          </View>
          <View style={styles.readpositionItem}>
            <Ionicons
              name="location-outline"
              size={20}
              color="black"
              style={styles.imageLogo}
            />
            <TextInput
              style={styles.text}
              multiline
              placeholder={profileData.state}
              value={state}
            />
          </View>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleSavePress}>
          <Text style={styles.buttonText}>Salvar</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
