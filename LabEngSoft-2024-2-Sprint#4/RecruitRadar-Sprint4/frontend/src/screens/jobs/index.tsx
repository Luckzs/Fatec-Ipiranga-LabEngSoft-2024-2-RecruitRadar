import React, { useCallback, useEffect, useRef, useState } from "react";
import { ActivityIndicator, Linking } from "react-native";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  Dimensions,
  Modal,
  Button,
  Alert,
} from "react-native";
import logoSmall from "../../assets/LogoSmall.png";
import excluir from "../../assets/excluir.png";
import { styles } from "./styles";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import Navbar from "../../components/Navbar";
import { useAuth } from "../../contexts/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../../services/api";
import Swiper from "react-native-deck-swiper";
import { ScrollView } from "react-native-gesture-handler";
import * as SplashScreen from "expo-splash-screen";
import * as Location from "expo-location";
import { sign } from "crypto";
import { get } from "http";

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
  latitude?: number; // Novos campos opcionais
  longitude?: number;
  postal_code: string;
  candidateExperiences: CandidateExperience[];
  candidateLanguages: CandidateLanguage[];
  candidateObjectives: CandidateObjective[];
  candidateSkills: CandidateSkill[];
  candidateStudies: CandidateStudy[];
  User: User;
}

interface CandidateExperience {
  candidate_experience_id: string;
  company_name: string;
  start_date: string; // Data no formato ISO
  end_date: string; // Data no formato ISO
  period: string;
  Experience: Experience;
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

interface CandidateSkill {
  candidate_skill_id: string;
  Skill: Skill;
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

interface Match {
  match_id: string;
  score: number;
}

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

type JobCardProps = {
  title: string;
  company_name: string;
  location: string;
  matchMessage: string;
  datePosted: string;
  imageUrl: string;
  vacancy_url: string;
  description: string;
  work_model: string;
  contract_type: string;
  contract_period: string;
  salary: string;
  salary_max: string;
  onPressDetails: () => void; // Adicionando esta prop para o onPress
};

const JobCard: React.FC<JobCardProps> = ({
  title,
  company_name,
  location,
  matchMessage,
  datePosted,
  imageUrl, // Certifique-se de receber a imagem aqui
  onPressDetails,
}) => {
  // Verifica se a URL da logo é inválida ou é "Sem logo", se for, usa a imagem padrão
  const logoUri =
    imageUrl && imageUrl !== "Sem logo"
      ? { uri: imageUrl }
      : require("../../assets/detsoft.png"); // Substitua pelo caminho da sua imagem padrão

  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.cardCompanyImage}>
        <Image
          source={logoUri} // Usa a logo ou a imagem padrão
          style={styles.companyImage}
        />
        <Text style={styles.companyName}>{company_name}</Text>
      </View>
      <Text style={styles.location}>{location}</Text>
      <View style={styles.cardImageUser}>
        <Image
          source={require("../../assets/profile.png")}
          style={styles.imageUser}
        />
        <Text style={styles.matchMessage}>{matchMessage}</Text>
      </View>
      <Text style={styles.datePosted}>{datePosted}</Text>
      <TouchableOpacity onPress={onPressDetails}>
        <Text style={styles.detailsLink}>Detalhes da vaga</Text>
      </TouchableOpacity>
    </View>
  );
};

const Jobs = () => {
  const [vacancyData, setVacancyData] = useState<VacancyData[]>([]);
  const [profileData, setProfileData] = React.useState<ProfileData | null>(
    null
  ); // Estado para armazenar os dados do perfil
  const { signed, user, signOut, isLoading } = useAuth();
  const [authLoading, setAuthLoading] = useState(true); // Carregamento de autenticação
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );
  const [locationPermissionGranted, setLocationPermissionGranted] =
    useState(false); // Adicionar estado para a permissão
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [foregroundPermission, setForegroundPermission] = useState("");
  const [loadingVacancy, setLoadingVacancy] = useState(true);
  const [selectedJob, setSelectedJob] = useState<null | JobCardProps>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [isSidebarVisible, setSidebarVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigation = useNavigation<any>();
  const [newApplication, setNewApplication] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const swiperRef = useRef<Swiper<VacancyData>>(null); // Referência ao Swiper
  const [isLiking, setIsLiking] = useState(false);

  const [isCustomLoadingVisible, setCustomLoadingVisible] = useState(true); // Estado de carregamento personalizado
  const [screenIsLoading, setIsLoading] = useState(true); // Estado de carregamento geral
  // Função para obter a localização do usuário
  const getLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        Alert.alert(
          "Permissão de localização negada",
          "Para receber as vagas recomendadas, habilite a permissão de localização em Configurações > Aplicativos> [RecruitRadar] > Permissões> Localização."
        );
        setLocationPermissionGranted(false); // A permissão foi negada
        return;
      }
      setLocationPermissionGranted(true); // Permissão concedida
      const userLocation = await Location.getCurrentPositionAsync({});
      setLocation(userLocation);
    } catch (error) {
      console.error("Erro ao obter localização: ", error);
      setLocationPermissionGranted(false); // Em caso de erro, tratar como permissão negada
    }
  };

  // Função para buscar os dados do perfil
  const fetchProfileData = async () => {
    setLoadingProfile(true);
    try {
      if (signed && user?.email) {
        const profileResponse = await api.get(`/candidate/${user.email}`);
        setProfileData(profileResponse.data);
      }
    } catch (error: any) {
      console.error("Erro ao buscar dados do perfil:", error.message);
    } finally {
      setLoadingProfile(false);
    }
  };

  // Função para buscar os dados das vagas (somente se a permissão de localização for concedida)
  const fetchVacancyData = async () => {
    setLoadingVacancy(true);
    if (locationPermissionGranted) {
      try {
        const response = await api.post("/jobRecommendation", {
          profileData, // Envia o objeto `profileData` completo
          location: {
            latitude: location?.coords.latitude,
            longitude: location?.coords.longitude,
          },
        });
        setVacancyData(
          Array.isArray(response.data) ? response.data : [response.data]
        );
      } catch (error: any) {
        console.error("Erro ao buscar vagas:", error.message);
      } finally {
        setLoadingVacancy(false);
      }
    } else {
      console.log(
        "Permissão de localização negada. Requisição de vagas não será executada."
      );
      setLoadingVacancy(false); // Marca como concluído, mesmo que não tenha feito a requisição
    }
  };

  useFocusEffect(
    useCallback(() => {
      // Código executado toda vez que a tela ganha o foco
      getLocation(); // Exemplo de função para atualizar a localização
    }, [])
  );

  // Efeito para verificar a autenticação e controlar a splash screen
  useEffect(() => {
    const checkAuthAndLoadData = async () => {
      if (!isLoading) {
        setIsLoading(true); // inicia o loading
        if (signed && user) {
          setAuthLoading(false); // Autenticação confirmada
        } else {
          signOut(); // Desloga se não estiver autenticado
          navigation.navigate("Start"); // Redireciona para a tela de login
        }
      }
    };

    checkAuthAndLoadData();
  }, [signed, user, isLoading]);

  // Carregar dados de localização, perfil, e vagas (se aplicável) após autenticação
  useEffect(() => {
    const loadData = async () => {
      if (!authLoading) {
        try {
          await getLocation(); // Tenta obter a localização primeiro
          await fetchProfileData(); // Busca o perfil
        } catch (error) {
          console.error("Erro ao carregar dados:", error);
        }
      }
    };

    loadData(); // Chama a função de inicialização
  }, [authLoading]);

  useEffect(() => {
    const fetchVacancyIfGranted = async () => {
      if (!loadingProfile) {
        try {
          
          await fetchVacancyData();
        } catch (error) {
          console.error("Erro ao buscar vagas:", error);
        }finally {
          setIsLoading(false); // desativa o loading apenas quando tudo é carregado
        }
      }
    };
    fetchVacancyIfGranted();
  }, [loadingProfile]);

  // Esconder a Splash Screen após a autenticação e carregamento de dados
  useEffect(() => {
    const hideSplashScreenAndShowCustomLoading = async () => {
      if (!authLoading && !loadingProfile && !loadingVacancy) {
        await SplashScreen.hideAsync(); // Oculta splash screen padrão
        setCustomLoadingVisible(false); // Oculta tela de carregamento personalizada
      }
    };
    hideSplashScreenAndShowCustomLoading();
  }, [authLoading, loadingProfile, loadingVacancy]);

    // Componente de Loading personalizado
    const LoadingScreen = () => (
      <Modal  visible={screenIsLoading} animationType="fade">
      <View style={styles.loadingContainer}>
        <Image source={logoSmall} style={styles.loadingLogo} />
        <ActivityIndicator size="large" color="#0262A6" />
        <Text style={styles.loadingText}>Carregando vagas recomendadas...</Text>
      </View>
    </Modal>
    );

  // Verificação para não renderizar a tela enquanto dados essenciais são carregados
  if (authLoading || loadingProfile || loadingVacancy) {
    return <LoadingScreen />; // Evita renderizar enquanto a splash screen deve estar visível
  }

  const goToProfile = () => {
    navigation.navigate("profileScreen", { profileData }); // Substitua 'ProfileScreen' pelo nome da sua tela de perfil
  };

  const openJobDetails = (job: JobCardProps) => {
    setSelectedJob(job);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedJob(null);
  };

  const createMatch = () => {
    if (isLiking) return; // Se já estiver processando, não faça nada
    setIsLiking(true); // Define como processando

    api
      .post("/match", {
        candidate_id: profileData?.candidate_id,
        vacancy_id: vacancyData[currentIndex].vacancy_id,
        score: 60,
        applied: true,
      })
      .then((response) => {
        console.log("Match criado:", response.data);
        setShowConfirmation(true);
        setNewApplication(true);

        setTimeout(() => {
          setShowConfirmation(false);
        }, 3000);
      })
      .catch((error) => {
        console.error("Erro ao criar match:", error.response.data.error);
      })
      .finally(() => {
        setIsLiking(false); // Restaura o estado para permitir novas interações
      });
  };

  const handleLikeButton = () => {
    swiperRef.current?.swipeRight(); // Chama a função comum
  };

  const handleDislike = () => {
    // Chama o swipeLeft programaticamente
    swiperRef.current?.swipeLeft();
  };

  const allJobsSwiped = currentIndex >= vacancyData.length;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.titlePrimaryContainer}>
          <Text style={styles.titlePrimary}>Recruit </Text>
          <Image
            source={require("../../assets/recruit_logo.png")}
            style={styles.logo}
          />
          <Text style={styles.titlePrimary}> Radar</Text>
        </View>
        <TouchableOpacity onPress={goToProfile}>
          <Image
            source={require("../../assets/profile.png")}
            style={styles.profile}
          />
        </TouchableOpacity>
      </View>

      {/* Exibe a mensagem de confirmação */}
      {showConfirmation && (
        <View style={styles.confirmationMessage}>
          <Text style={styles.confirmationText}>Candidatura realizada!</Text>
        </View>
      )}

      <View style={styles.content}>
        {allJobsSwiped ? (
          // Exibe a imagem/mensagem de "sem mais vagas"
          <View style={styles.noMoreJobsContainer}>
            <Image
              source={require("../../assets/Sem Match.png")}
              style={styles.noMoreJobsImage}
            />
            <Text style={styles.noMoreJobsText}>
              Nesse Momento Estamos {"\n"} Procurando Vagas Que Dão{"\n"}
              Match Com Seu Perfil.
            </Text>

            {/* Exibe uma mensagem se a localização estiver desabilitada */}
            {!locationPermissionGranted && (
              <Text style={styles.locationDisabledText}>
                Localização desabilitada. Para receber vagas recomendadas,
                habilite a localização nas configurações do aplicativo no seu
                sistema.
              </Text>
            )}
          </View>
        ) : (
          <View style={styles.swiperContainer}>
            <Swiper
              cards={vacancyData}
              ref={swiperRef} // Adiciona a referência ao Swiper
              renderCard={(item: VacancyData, index: number) => {
                const base64Logo =
                  item.logo !== "Sem logo"
                    ? `data:image/jpeg;base64,${item.logo}`
                    : "Sem logo"; // Decodificando logo

                return (
                  <JobCard
                    key={item.vacancy_id || index} // Garantindo que o key seja único, utilizando vacancy_id ou o index
                    title={item.title}
                    company_name={item.company_name}
                    vacancy_url={item.url}
                    work_model={item.work_model}
                    location={`${item.city}, ${item.state}`}
                    contract_type={item.contract_type}
                    contract_period={item.contract_period}
                    salary={item.salary}
                    salary_max={item.salary_max}
                    matchMessage="Seu perfil corresponde a esta vaga"
                    datePosted={`Anunciada em: ${new Date(
                      item.created_at
                    ).toLocaleDateString("pt-BR")}`}
                    description={item.description}
                    imageUrl={base64Logo} // Passa a logo decodificada
                    onPressDetails={() =>
                      openJobDetails({
                        title: item.title,
                        company_name: item.company_name,
                        location: `${item.city}, ${item.state}`,
                        matchMessage: "Seu perfil corresponde a esta vaga",
                        datePosted: `${new Date(
                          item.created_at
                        ).toLocaleDateString("pt-BR")}`,
                        description: item.description,
                        imageUrl: base64Logo,
                        vacancy_url: item.url,
                        work_model: item.work_model,
                        contract_type: item.contract_type,
                        contract_period: item.contract_period,
                        salary: item.salary,
                        salary_max: item.salary_max,
                        onPressDetails: () => {},
                      })
                    }
                  />
                );
              }}
              onSwipedRight={() => createMatch()} // Lógica para like
              onSwipedLeft={() => setCurrentIndex(currentIndex + 1)} // Lógica para dislike
              onSwiped={(cardIndex) => setCurrentIndex(cardIndex + 1)}
              cardIndex={currentIndex}
              backgroundColor={"#fff"}
              stackSize={3}
              containerStyle={styles.swiper}
              showSecondCard
            />
          </View>
        )}
      </View>

      {/* Renderização dos Botões de Like/Dislike */}
      {!allJobsSwiped && (
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.dislike} onPress={handleDislike}>
            <Image
              style={styles.dislike}
              source={require("../../assets/excluir.png")}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.like} onPress={handleLikeButton}>
            <Image
              style={styles.like}
              source={require("../../assets/gostei.png")}
            />
          </TouchableOpacity>
        </View>
      )}

      <Navbar newApplication={newApplication} />

      {/* Modal de Detalhes da Vaga */}
      {selectedJob && (
        <Modal
          visible={modalVisible}
          transparent={true}
          animationType="slide"
          onRequestClose={closeModal}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                {/* 
                <TouchableOpacity onPress={closeModal}>
                  <Image
                    source={require("../../assets/arrow-left-icon.png")}
                    style={styles.backIcon}
                  />
                </TouchableOpacity>
                */}

                <Text style={styles.modalTitle}>{selectedJob.title}</Text>
              </View>
              <View style={styles.companyInfo}>
                <Image
                  source={
                    selectedJob.imageUrl && selectedJob.imageUrl !== "Sem logo"
                      ? { uri: selectedJob.imageUrl }
                      : require("../../assets/detsoft.png")
                  } // Imagem padrão
                  style={styles.companyLogo}
                />
                <View>
                  <Text style={styles.companyName}>
                    {selectedJob.company_name}
                  </Text>
                  <Text style={styles.location}>{selectedJob.location}</Text>
                  <Text style={styles.datePosted}>
                    Anunciada em: {selectedJob.datePosted}
                  </Text>
                </View>
              </View>

              <ScrollView>
                <Text style={styles.sectionTitle}>Sobre a vaga</Text>
                <Text style={styles.modalDescription}>
                  {selectedJob.description}
                </Text>

                <Text style={styles.sectionTitle2}>Modelo de Trabalho:</Text>
                <Text style={styles.modalDescription}>
                  {selectedJob.work_model}
                </Text>

                <Text style={styles.sectionTitle2}>Tipo de Contrato:</Text>
                <Text style={styles.modalDescription}>
                  {selectedJob.contract_type}
                </Text>

                <Text style={styles.sectionTitle2}>Jornada de Trabalho:</Text>
                <Text style={styles.modalDescription}>
                  {selectedJob.contract_period}
                </Text>

                <Text style={styles.sectionTitle2}>Salário:</Text>
                <Text style={styles.modalDescription}>
                  {selectedJob.salary === "Salário a combinar"
                    ? "Salário a combinar"
                    : `R$ ${selectedJob.salary} a R$ ${selectedJob.salary_max}`}
                </Text>

                {/* 
                <Text style={styles.sectionTitle2}>URl da Vaga:</Text>
                <TouchableOpacity
                  onPress={() => Linking.openURL(selectedJob.vacancy_url)}
                >
                  <Text style={styles.modalDescription}>
                    {selectedJob.vacancy_url}
                  </Text>
                </TouchableOpacity>
                */}
              </ScrollView>

              <Button title="Fechar" onPress={closeModal} />
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

export default Jobs;
