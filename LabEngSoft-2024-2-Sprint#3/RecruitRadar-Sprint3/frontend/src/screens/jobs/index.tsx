import React, { useCallback, useEffect, useRef, useState } from "react";
import { Linking } from "react-native";
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
  const { signed,user, signOut } = useAuth();
  const [selectedJob, setSelectedJob] = useState<null | JobCardProps>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [isSidebarVisible, setSidebarVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigation = useNavigation<any>();
  const [newApplication, setNewApplication] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const swiperRef = useRef<Swiper<VacancyData>>(null); // Referência ao Swiper
  const [isLiking, setIsLiking] = useState(false);

  const fetchVacancyData = async () => {
    try {
      const response = await api.get("/vacancynotmatch");
      //console.log("Dados da vaga", JSON.stringify(response.data, null, 2));
      // Verificar se os dados estão no formato correto
      const vacancyArray = Array.isArray(response.data)
        ? response.data
        : [response.data];
      setVacancyData(vacancyArray);
    } catch (error: any) {
      console.error(
        "Erro ao buscar dados do perfil:",
        error.response.data.error
      );
    }
  };

  const fetchProfileData = async () => {
    try {

      if(signed){
        const email = user.email;
        console.log("Email encontrado no AsyncStorage:", email);
        const profileResponse = await api.get(`/candidate/${email}`);
        console.log("Dados do candidato:", profileResponse.data);
        setProfileData(profileResponse.data);
      };
    } catch (error: any) {
      console.error("Erro ao buscar dados do perfil:", error.message);
    }
  };
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        await Promise.all([fetchVacancyData(), fetchProfileData()]);
      } catch (error) {
        console.error("Erro ao buscar os dados:", error);
      }
    };
    fetchData();
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchVacancyData();
      fetchProfileData();
    }, [])
  );

  /*function handleSignOut() {
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
  }*/

  /*const data = [
    {
      id : "1",
      title: "Software Engineer",
      companyName: "Detsoft",
      location: "São Paulo, Brasil (Remoto)",
      matchMessage: "Seu perfil corresponde a esta vaga",
      description:
        "Detsoft was born in 2013 with the mission to fight complexity to empower people in their daily lives by reinventing financial services. We are one of the world’s largest digital banking platforms, serving millions of customers across Brazil, Mexico, and Colombia. For more information, visit our institutional page https://international.detsoft.com.br/careers/",
      imageUrl: "",
      datePosted: "Há 1 mês",
    },
    {
      id: "2",
      title: "Product Manager",
      companyName: "Tech Solutions",
      location: "Rio de Janeiro, Brasil",
      matchMessage: "Perfil parcialmente compatível",
      description: "Gerenciamento de produtos digitais...",
      imageUrl: "",
      datePosted: "Há 2 semanas",
    },
    {
      id: "3",
      title: "UX Designer",
      companyName: "Creative Labs",
      location: "Curitiba, Brasil",
      matchMessage: "Boa compatibilidade",
      description: "Design de interfaces e experiências...",
      imageUrl: "",
      datePosted: "Há 3 dias",
    },
  ];*/

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

  if (!vacancyData && !profileData) {
    console.log("Dados não carregados ainda...");
    return <Text>Loading...</Text>; // Exibe um texto de carregamento enquanto os dados são buscados
  }
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
