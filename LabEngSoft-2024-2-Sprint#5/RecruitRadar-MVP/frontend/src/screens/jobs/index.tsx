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
import logoSmall from "../../assets/LogoBetterSmall.png";
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
import { useVacancy } from "../../contexts/vacancy";
import { MaterialIcons } from "@expo/vector-icons"; // Importando o ícone do Material Icons

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
  const navigation = useNavigation<any>();

  //const [vacancyData, setVacancyData] = useState<VacancyData[]>([]);
  const { signed, user, signOut, isLoading } = useAuth();
  const { vacancyData, setVacancyData } = useVacancy(); // Substitua pelo hook

  const [profileData, setProfileData] = React.useState<ProfileData | null>(
    null
  ); // Estado para armazenar os dados do perfil
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );
  const [locationPermissionGranted, setLocationPermissionGranted] =
    useState(false); // Adicionar estado para a permissão

  const [screenIsLoading, setIsLoading] = useState(true); // Estado de carregamento geral
  const [authLoading, setAuthLoading] = useState(true); // Carregamento de autenticação
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [loadingVacancy, setLoadingVacancy] = useState(true);

  const [selectedJob, setSelectedJob] = useState<null | JobCardProps>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [interactedJobs, setInteractedJobs] = useState<string[]>([]); // Armazena IDs das vagas interagidas
  const [localVacancyData, setLocalVacancyData] = useState<VacancyData[]>([]);

  const [newApplication, setNewApplication] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const swiperRef = useRef<Swiper<VacancyData>>(null); // Referência ao Swiper

  const [isProcessing, setIsProcessing] = useState(false); // Flag para controlar requisição

  const [isCooldownActive, setIsCooldownActive] = useState(false); // Estado de cooldown
  const [isButtonDisabled, setIsButtonDisabled] = useState(false); // Bloqueio do botão

  // Função para iniciar o cooldown
  const startCooldown = () => {
    setIsCooldownActive(true); // Ativa o cooldown
    setTimeout(() => {
      setIsCooldownActive(false); // Desativa após 2 segundos
    }, 2000); // Cooldown de 2 segundos
  };

  //const [isCustomLoadingVisible, setCustomLoadingVisible] = useState(true); // Estado de carregamento personalizado

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

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
          console.log("buscando perfil");
          await getLocation(); // Tenta obter a localização primeiro
          await fetchProfileData(); // Busca o perfil
        } catch (error) {
          console.error("Erro ao carregar dados:", error);
        }
      }
    };

    loadData(); // Chama a função de inicialização
  }, [authLoading]);

  // Função para obter a localização do usuário
  const getLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      console.log(status);

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

  useEffect(() => {
    const fetchVacancyIfGranted = async () => {
      if (!loadingProfile) {
        try {
          await fetchVacancyData();
          console.log(
            "v: " + vacancyData.length + " - l:" + localVacancyData.length
          );
        } catch (error) {
          console.error("Erro ao buscar vagas:", error);
        } finally {
          setIsLoading(false);
        }
      }
    };
    fetchVacancyIfGranted();
  }, [loadingProfile]);

  // Função para buscar os dados das vagas (somente se a permissão de localização for concedida)
  const fetchVacancyData = async () => {
    if (vacancyData.length > 0) {
      console.log("Dados de vagas já carregados.");
      console.log(
        "v: " + vacancyData.length + " - l:" + localVacancyData.length
      );
      setLocalVacancyData(vacancyData); // Copia para estado local
      setLoadingVacancy(false);
      return; // Verifica se já há dados na memória
    }

    console.log("v: " + vacancyData.length + " - l:" + localVacancyData.length);
    setIsLoading(true); // Ativa o loading
    setLoadingVacancy(true);

    if (locationPermissionGranted) {
      try {
        const start = new Date();
        const response = await api.post("/jobRecommendation", {
          profileData, // Envia o objeto `profileData` completo
          location: {
            latitude: location?.coords.latitude,
            longitude: location?.coords.longitude,
          },
        });
        const data = Array.isArray(response.data)
          ? response.data
          : [response.data];
        setVacancyData(data); // Atualiza o global
        setLocalVacancyData(data); // Atualiza o local
        const end = new Date();
        console.log("Tempo de requisição:", (end.getTime() - start.getTime())/1000, "s");
      } catch (error: any) {
        console.error("Erro ao buscar vagas:", error.response.data.error);
      } finally {
        setLoadingVacancy(false);
        setIsLoading(false); // Desativa o loading
      }
    } else {
      console.log(
        "Permissão de localização negada. Requisição de vagas não será executada."
      );
      setLoadingVacancy(false); // Marca como concluído, mesmo que não tenha feito a requisição
      setIsLoading(false); // Desativa o loading
    }
  };

  // Atualiza vagas no estado global ao sair da tela
  const updateVacancyData = useCallback(() => {
    setVacancyData((prev) =>
      prev.filter((vacancy) => !interactedJobs.includes(vacancy.vacancy_id))
    );
  }, [interactedJobs, setVacancyData]);

  // UseFocusEffect para atualizar ao sair
  useFocusEffect(
    useCallback(() => {
      return navigation.addListener("beforeRemove", updateVacancyData);
    }, [navigation, updateVacancyData])
  );

  useFocusEffect(
    useCallback(() => {
      // Código executado toda vez que a tela ganha o foco
      getLocation(); // Exemplo de função para atualizar a localização
    }, [])
  );

  // Esconder a Splash Screen após a autenticação e carregamento de dados
  /* useEffect(() => {
    const hideSplashScreenAndShowCustomLoading = async () => {
      if (!authLoading && !loadingProfile && !loadingVacancy) {
        await SplashScreen.hideAsync(); // Oculta splash screen padrão
        setCustomLoadingVisible(false); // Oculta tela de carregamento personalizada
      }
    };
    hideSplashScreenAndShowCustomLoading();
  }, [authLoading, loadingProfile, loadingVacancy]);*/

  // Componente de Loading personalizado
  const LoadingScreen = () => (
    <Modal visible={screenIsLoading} animationType="fade">
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
    updateVacancyData(); // Atualiza os dados antes de sair
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

  const createMatch = async () => {
    if (isProcessing) return; // Se já estiver processando, ignore novas ações

    setIsProcessing(true); // Bloqueia novas interações durante a requisição

    try {
      const response = await api.post("/match", {
        candidate_id: profileData?.candidate_id,
        vacancy_id: vacancyData[currentIndex].vacancy_id,
        score: 60,
        applied: true,
      });

      console.log("Match criado:", response.data);
      setShowConfirmation(true);
      setNewApplication(true);

      setTimeout(() => {
        setShowConfirmation(false);
      }, 3000);
    } catch (error: any) {
      console.error(
        "Erro ao criar match:",
        error.response?.data || error.message
      );
      Alert.alert("Erro", "Não foi possível criar o match. Tente novamente.");
    } finally {
      setIsProcessing(false); // Libera para novas interações
    }
  };

  // Função para lidar com swipes
  const handleSwipeRight = async () => {
    if (isCooldownActive) {
      console.log("Aguarde o cooldown antes de realizar outra ação.");
      return;
    }
    setIsButtonDisabled(true);
    // Inicia o cooldown
    startCooldown();

    await createMatch();
    // Chama a função para criar o match
    const currentVacancy = vacancyData[currentIndex];
    if (currentVacancy) {
      setInteractedJobs((prev) => [...prev, currentVacancy.vacancy_id]);
      setCurrentIndex((prev) => prev + 1);
    }
    console.log(vacancyData.length);
    console.log(currentIndex);
    setTimeout(() => setIsButtonDisabled(false), 2000); // Desbloqueia após 2 segundos
  };

  // Função para lidar com dislikes
  const handleSwipeLeft = () => {
    if (isCooldownActive) {
      console.log("Aguarde o cooldown antes de realizar outra ação.");
      return;
    }
    setIsButtonDisabled(true);
    // Inicia o cooldown
    startCooldown();

    // Atualiza o índice e os jobs interagidos
    const currentVacancy = vacancyData[currentIndex];
    if (currentVacancy) {
      setInteractedJobs((prev) => [...prev, currentVacancy.vacancy_id]);
      setCurrentIndex((prev) => prev + 1);
    }
    setTimeout(() => setIsButtonDisabled(false), 2000); // Desbloqueia após 2 segundos
    console.log("Dislike registrado.");
  };

  // Função para lidar com o botão de like
  const handleLikeButton = () => {
    if (isButtonDisabled || isCooldownActive) {
      console.log("Ação bloqueada. Aguarde antes de tentar novamente.");
      return;
    }
    setIsButtonDisabled(true);
    try {
      swiperRef.current?.swipeRight(); // Simula o swipe à direita
    } finally {
      // Desbloqueia o botão após cooldown
      startCooldown();
      setTimeout(() => setIsButtonDisabled(false), 2000); // Desbloqueia após 2 segundos
    }
  };

  // Função para lidar com o botão de dislike
  const handleDislike = () => {
    if (isCooldownActive) {
      console.log("Aguarde o cooldown antes de realizar outra ação.");
      return;
    }

    setIsButtonDisabled(true);
    try {
      swiperRef.current?.swipeLeft(); // Simula o swipe à esquerda
    } finally {
      // Desbloqueia o botão após cooldown
      startCooldown();
      setTimeout(() => setIsButtonDisabled(false), 2000); // Desbloqueia após 2 segundos
    }
  };

  const allJobsSwiped = currentIndex >= vacancyData.length;

  const reloadSwiper = () => {
    setCurrentIndex(0); // Reinicia o índice para o primeiro card
  };

  const reloadVacancies = async () => {
    updateVacancyData(); // Atualiza os dados antes de sair
    vacancyData.length = 0; // Limpa o array de vagas
    setVacancyData(vacancyData); // Esvazia vacancyData antes de sair
    setLocalVacancyData([]); // Limpa o estado local
    await fetchVacancyData(); // Chama a função para buscar novas vagas
    console.log("Atualizando vagas...");
    console.log(vacancyData.length);
    console.log(localVacancyData.length);
  };

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
        {/* Botão de atualização para obter vagas atualizadas */}
        <TouchableOpacity
          onPress={reloadVacancies}
          style={styles.updateButton} // Estilização para o botão de atualização
        >
          <MaterialIcons name="refresh" size={40} color="#0262A6" />
        </TouchableOpacity>
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

            <Text style={styles.noMoreJobsText}>
              Não há mais vagas disponíveis. Ajuste o seu perfil para receber
              mais recomendações.
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
              cards={localVacancyData}
              ref={swiperRef} // Adiciona a referência ao Swiper
              onSwipedRight={() => handleSwipeRight()} // Lógica para like
              //onSwipedLeft={() => setCurrentIndex(currentIndex + 1)} // Lógica para dislike
              onSwipedLeft={() => handleSwipeLeft()} // Lógica para dislike
              //onSwiped={(cardIndex) => setCurrentIndex(cardIndex + 1)}
              cardIndex={currentIndex}
              backgroundColor={"#fff"}
              stackSize={3}
              containerStyle={styles.swiper}
              stackSeparation={15}
              renderCard={(item: VacancyData, index: number) => {
                if (!item) {
                  console.error(`Item indefinido no índice ${index}`);
                  return null;
                }

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
            />
          </View>
        )}
      </View>

      {/* Renderização dos Botões de Like/Dislike */}
      {!allJobsSwiped && (
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.dislike, isButtonDisabled && styles.disabledButton]}
            onPress={handleDislike}
            disabled={isButtonDisabled} // Desativa o botão no estado bloqueado
          >
            <Image
              style={styles.dislike}
              source={require("../../assets/excluir.png")}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.like, isButtonDisabled && styles.disabledButton]} // Estilização para botão desativado
            onPress={handleLikeButton}
            disabled={isButtonDisabled} // Desativa o botão no estado bloqueado
          >
            <Image
              style={styles.like}
              source={require("../../assets/gostei.png")}
            />
          </TouchableOpacity>
        </View>
      )}

      <Navbar
        newApplication={newApplication}
        onBeforeNavigate={(callback) => {
          updateVacancyData();
          callback();
        }}
      />

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
                    : selectedJob.salary_max
                    ? `R$ ${selectedJob.salary} a R$ ${selectedJob.salary_max}`
                    : `R$ ${selectedJob.salary}`}
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
              <TouchableOpacity
                style={styles.buttonRegister}
                onPress={closeModal}
              >
                <Text style={styles.buttonRegisterText}>Fechar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

export default Jobs;
