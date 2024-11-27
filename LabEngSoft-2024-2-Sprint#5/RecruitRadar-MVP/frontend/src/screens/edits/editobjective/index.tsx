import {
  View,
  Text,
  Image,
  Alert,
  TouchableOpacity,
  
  TouchableWithoutFeedback,
  ActivityIndicator,
} from "react-native";
import {  } from 'react-native-gesture-handler';

import { styles } from "./styles";
import logoSmall from "../../../assets/LogoBetterSmall.png";
import { ScrollView, FlatList,TextInput } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect } from "react";
import Slider from "@react-native-community/slider";
import DropDownPicker from "react-native-dropdown-picker";
import useAsyncStorage from "@react-native-async-storage/async-storage";
import { setegid } from "process";
import api from "../../../services/api";
import { Button } from "../../../components/Button";
import { profile } from "console";

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
  professional_area: string;
  candidateObjectives: CandidateObjective[];
  User: User;
}

interface CandidateObjective {
  candidate_objective_id: string;
  job: string;
  work_model: string;
  salary_expectation: string;
  professional_area: string;
  distance_radius: number;
}

// Definindo o tipo de navegação e rotas
type RootStackParamList = {
  editCandidateObjectives: { profileData: ProfileData };
};

// Definindo o tipo da rota
type editCandidateObjectivesRouteProp = RouteProp<
  RootStackParamList,
  "editCandidateObjectives"
>;

export function EditCandidateObjectives() {
  const navigation = useNavigation<any>();
  const route = useRoute<editCandidateObjectivesRouteProp>(); // Obtendo os parâmetros da rota
  const { profileData } = route.params;

  const [email, setEmail] = React.useState(profileData.User.email);
  const [salary, setSalary] = React.useState(
    profileData.candidateObjectives[0]?.salary_expectation || "3500,00"
  );
  const [positions, setPositions] = React.useState<string[]>(
    profileData.candidateObjectives[0]?.job.split(",") || []
  );
  const [distance, setDistance] = React.useState(
    profileData.distance_radius || 20
  );
  const [workModel, setWorkModel] = React.useState<string[]>(
    profileData.candidateObjectives[0]?.work_model.split(",") || []
  );

  const [objectives, setObjectives] = React.useState<CandidateObjective[]>(
    profileData.candidateObjectives.map((objective) => ({
      candidate_objective_id: objective.candidate_objective_id,
      job: objective.job,
      work_model: objective.work_model,
      salary_expectation: objective.salary_expectation,
      professional_area: objective.professional_area,
      distance_radius: objective.distance_radius,
    }))
  );

  const [open, setOpen] = React.useState(false);
  const [isAddingPosition, setIsAddingPosition] = React.useState(false);
  const [newPosition, setNewPosition] = React.useState("");
  const [isEditingSalary, setIsEditingSalary] = React.useState(false);

  const [professionalAreas, setProfessionalAreas] = React.useState<string[]>(
    []
  );
  // Estado para armazenar a área profissional selecionada
  const [searchText, setSearchText] = React.useState(
    profileData.candidateObjectives[0]?.professional_area || ""
  );
  const [filteredAreas, setFilteredAreas] = React.useState<string[]>([]);
  const [selectedArea, setSelectedArea] = React.useState<string | null>(null);
  const [isDropdownVisible, setDropdownVisible] = React.useState(false);

  const [isLoading, setIsLoading] = React.useState(false);

  useEffect(() => {
    const fetchProfessionalAreas = async () => {
      try {
        const response = await api.get("/professional_areas");
        setProfessionalAreas(response.data);
        setFilteredAreas(response.data);
      } catch (error) {
        Alert.alert(
          "Erro",
          "Não foi possível carregar as áreas profissionais."
        );
      }
    };
    fetchProfessionalAreas();
  }, []);

  // Função para normalizar uma string, removendo acentos
  const normalizeText = (text: string) => {
    return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  };

  // Atualiza a lista de áreas filtradas conforme o usuário digita
  const handleSearchTextChange = (text: string) => {
    setSearchText(text);

    // Filtra as áreas que contêm o texto digitado
    const filtered = professionalAreas.filter((area) =>
      normalizeText(area)
        .toLowerCase()
        .includes(normalizeText(text).toLowerCase())
    );
    setFilteredAreas(filtered);
  };

  // Atualiza o campo de entrada com a área selecionada
  const handleSelectArea = (area: string) => {
    setSearchText(area);
    setDropdownVisible(false);
  };

  const handleNavigate = async () => {
    console.log(positions); //objectives
    console.log(positions.toString()); //objectives
    console.log(salary); //objectives
    console.log(distance); //candidates
    console.log(workModel.toString()); //objectives

    const email = await useAsyncStorage
      .getItem("@RRAuth:user")
      .then((response) => {
        return JSON.parse(response || "{}").email;
      });

    setEmail(email);
    console.log(email);

    const objectives: CandidateObjective = {
      candidate_objective_id:
        profileData.candidateObjectives[0].candidate_objective_id,
      job: positions.toString(),
      professional_area: searchText,
      work_model: workModel.toString(),
      salary_expectation: salary,
      distance_radius: distance,
    };

    console.log(objectives);

    setIsLoading(true);
    api.put("candidate/objective", { objectives })
      .then((response) => {
        setIsLoading(false);
        Alert.alert("Sucesso", "Objetivos cadastrados com sucesso.");
        console.log(response);
        navigation.goBack();
      })
      .catch((error) => {
        setIsLoading(false);
        Alert.alert("Erro", "Erro ao cadastrar objetivos." + error);
        console.log(error);
      }).finally(() => {
        setIsLoading(false);
      });
  };

  const handleAddPosition = () => {
    if (newPosition.trim() === "") {
      Alert.alert("Erro", "O campo de cargo não pode estar vazio.");
      return;
    }
    if (positions.length >= 3) {
      Alert.alert("Erro", "Você pode adicionar até 3 cargos.");
      return;
    }
    setPositions([...positions, newPosition]);
    setNewPosition("");
    setIsAddingPosition(false);
  };

  const handleRemovePosition = (index: number) => {
    const updatedPositions = positions.filter((_, i) => i !== index);
    setPositions(updatedPositions);
  };

  const handleRemoveWorkModel = (value: string) => {
    const updatedWorkModel = workModel.filter((item) => item !== value);
    setWorkModel(updatedWorkModel);
  };

  const handleEditSalary = () => {
    setIsEditingSalary(true);
  };

  const handleSaveSalary = () => {
    setIsEditingSalary(false);
  };

  const handleNav = () => {
    navigation.goBack();
  };

  const renderObjectiveItem = ({ item }: { item: CandidateObjective }) => (
    <View style={styles.content}>
      {/* Campo de Cargo */}
      <View style={styles.inputGroup}>
        <Text style={styles.carlabel}>Cargos/Posições :</Text>
        <TextInput
          style={styles.input}
          placeholder={
            positions.length >= 3
              ? ""
              : "+ Adicione 3 cargos que esteja buscando *"
          }
          value={newPosition}
          onChangeText={setNewPosition}
        />
      </View>

      <View style={styles.tagsContainer}>
        {positions.map((item, index) => (
          <View key={index} style={styles.tag}>
            <Text style={styles.tagText}>{item}</Text>
            <TouchableOpacity
              style={styles.removePosition}
              onPress={() => handleRemovePosition(index)}
            >
              <Ionicons name="close" size={24} color={"black"} />
            </TouchableOpacity>
          </View>
        ))}
      </View>

      {positions.length < 3 && (
        <TouchableOpacity
          style={styles.addbuttonPrimary}
          onPress={handleAddPosition}
        >
          <Text style={styles.addtextbuttonPrimary}>+ Adicionar Formação</Text>
        </TouchableOpacity>
      )}

      
      {/* Campo de Área Profissional */}
      <Text style={styles.carlabel}>Área Profissional :</Text>
      <View style={styles.section}>
        <TextInput
          style={styles.input2}
          placeholder="Digite uma área profissional"
          value={searchText}
          defaultValue={profileData.candidateObjectives[0].professional_area}
          onChangeText={handleSearchTextChange}
          scrollEnabled={false}
          multiline={true}
          textAlignVertical="center"
          onFocus={() => setDropdownVisible(true)}
        />

        
        {/* Exibe a lista de opções filtradas com rolagem */}
        {isDropdownVisible && searchText !== "" && (
          <FlatList
            nestedScrollEnabled={true}  
            data={filteredAreas}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <TouchableWithoutFeedback onPress={()=>{}}>
              <TouchableOpacity onPress={() => handleSelectArea(item)}>
                <Text style={styles.dropdownItem}>{item}</Text>
              </TouchableOpacity>
              </TouchableWithoutFeedback>
            )}
            style={styles.dropdownList} // Altura limitada para permitir rolagem
            showsVerticalScrollIndicator={true}
          />
        )}
        
      </View>

      {/* Campo de Pretensão Salarial */}
      <Text style={styles.carlabel2}>Pretensão Salarial :</Text>
      <View style={styles.section}>
        <View style={styles.salaryinputGroup}>
          {isEditingSalary ? (
            <TextInput
              style={styles.input}
              value={salary}
              onChangeText={setSalary}
              keyboardType="numeric"
              onBlur={handleSaveSalary} // Salva automaticamente quando o campo perde o foco
              autoFocus
            />
          ) : (
            <View style={styles.salaryDisplayContainer}>
              <Text onPress={handleEditSalary} style={styles.salaryText}>
                R$ {salary}
              </Text>
              <TouchableOpacity onPress={handleEditSalary}>
                <Ionicons name="pencil" size={15} color="black" />
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>

      {/* Campo de Distância */}
      <View style={styles.section}>
      <Text style={styles.carlabel}>Preferência de distância:</Text>
        <View style={styles.sliderContainer}>
          <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={100}
            step={1}
            value={distance}
            onValueChange={(value) => setDistance(value)}
            minimumTrackTintColor="blue"
            maximumTrackTintColor="#d3d3d3"
            thumbTintColor="black"
          />
          <Text style={styles.valueText}>{distance} km</Text>
        </View>
      </View>

      {/* Campo de Modelo de Trabalho */}
      <Text style={styles.carlabel}>Modelo de Trabalho :</Text>
      <View style={styles.section}>
        {workModel.length < 3 && (
          <DropDownPicker
            style={styles.text}
            open={open}
            value={null} // Nenhum valor selecionado inicialmente
            items={[
              { label: "Híbrido", value: "Híbrido" },
              { label: "Presencial", value: "Presencial" },
              { label: "Remoto", value: "Remoto" },
            ]}
            setOpen={setOpen}
            multiple={true} // Permite selecionar mais de uma opção
            min={0} // Número mínimo de opções selecionadas
            max={3}
            setValue={setWorkModel}
            placeholder="Selecione o modelo de trabalho"
            containerStyle={{ marginTop: 10 }}
            zIndex={1000}
            zIndexInverse={3000}
          />
        )}
        <View style={styles.tagsContainer}>
          {workModel.map((model, index) => (
            <View key={index} style={styles.tag}>
              <Text style={styles.tagText}>{model}</Text>
              <TouchableOpacity
                style={styles.removePosition}
                onPress={() => handleRemoveWorkModel(model)}
              >
                <Ionicons name="close" size={24} color={"black"} />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </View>

      <TouchableOpacity style={styles.addbuttonPrimary1} onPress={handleNavigate}>
        <Text style={styles.addtextbuttonPrimary1}>Salvar</Text>
      </TouchableOpacity>
    </View>
  );

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Image source={logoSmall} style={styles.loadingLogo} />
          <ActivityIndicator size="large" color="#0262A6" />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={objectives}
        renderItem={renderObjectiveItem}
        style={styles.content}
        nestedScrollEnabled={true}  
        keyExtractor={(item) => item.candidate_objective_id}
        ListHeaderComponent={
          <View style={styles.headerContainer}>
            <TouchableOpacity
              onPress={handleNav}
              style={styles.backiconContainer}
            >
              <Ionicons
                name="arrow-back"
                size={24}
                style={styles.backIcon}
                color={"#FFFFFF"}
              />
            </TouchableOpacity>
            <Image
              source={logoSmall}
              style={styles.imageLogo}
              resizeMode="stretch"
            />
            <Text style={styles.title}>Preferências</Text>
          </View>
        }
      />
    </View>
  );
}
