import { View, Text, Image, Alert, TouchableOpacity } from "react-native";
import { styles } from "./styles";
import logoSmall from "../../../assets/LogoSmall.png";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import React from "react";
import Slider from "@react-native-community/slider";
import DropDownPicker from "react-native-dropdown-picker";
import useAsyncStorage from "@react-native-async-storage/async-storage";
import { setegid } from "process";
import api from "../../../services/api";
import { Button } from "../../../components/Button";

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
  candidateObjectives: CandidateObjective[];
  User: User;
}

interface CandidateObjective {
  candidate_objective_id: string;
  job: string;
  work_model: string;
  salary_expectation: string;
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

  const [open, setOpen] = React.useState(false);
  const [isAddingPosition, setIsAddingPosition] = React.useState(false);
  const [newPosition, setNewPosition] = React.useState("");
  const [isEditingSalary, setIsEditingSalary] = React.useState(false);

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
      work_model: workModel.toString(),
      salary_expectation: salary,
      distance_radius: distance,
    };

    console.log(objectives);

    api
      .put("candidate/objective", { objectives })
      .then((response) => {
        Alert.alert("Sucesso", "Objetivos cadastrados com sucesso.");
        console.log(response);
        navigation.goBack();
      })
      .catch((error) => {
        Alert.alert("Erro", "Erro ao cadastrar objetivos." + error);
        console.log(error);
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

  return (
    <ScrollView style={styles.scrollView}>
    <View style={styles.container}>
      <Image source={logoSmall} style={styles.imageLogo} resizeMode="stretch" />

      {/* Botão de Retorno */}
      <TouchableOpacity style={styles.backButton} onPress={handleNav}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>

      <View style={styles.content}>
        <Text style={styles.title}>Preferências</Text>

        {/* Campo de Cargo */}
        <View style={styles.inputGroup}>
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
          {positions.length < 3 && (
            <TouchableOpacity
              style={styles.addButton}
              onPress={handleAddPosition}
            >
              <Text style={styles.addButtonText}>+</Text>
            </TouchableOpacity>
          )}
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

        {/* Campo de Pretensão Salarial */}
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
                <Text style={styles.salaryText}>
                  Pretensão Salarial: R$ {salary}
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
          <View style={styles.sliderContainer}>
            <Text style={styles.text}>Preferência de distância:</Text>
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

        <TouchableOpacity style={styles.button} onPress={handleNavigate}>
          <Text style={styles.buttonText}>Salvar</Text>
        </TouchableOpacity>
      </View>
    </View>
    </ScrollView>
  );
}
