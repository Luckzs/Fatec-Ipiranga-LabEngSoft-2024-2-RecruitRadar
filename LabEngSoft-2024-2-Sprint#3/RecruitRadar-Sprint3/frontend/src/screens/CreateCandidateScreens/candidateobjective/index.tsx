import { View, Text, Image, Alert, TouchableOpacity } from "react-native";
import { styles } from "./styles";
import logoSmall from "../../../assets/LogoSmall.png";
import { Button } from "../../../components/Button";
import { TextInput } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import { StackActions, useNavigation } from "@react-navigation/native";
import React from "react";
import Slider from "@react-native-community/slider";
import DropDownPicker from "react-native-dropdown-picker";
import useAsyncStorage from "@react-native-async-storage/async-storage";
import { setegid } from "process";
import api from "../../../services/api";
import { firstTime } from "../../../services/auth";
import { useAuth } from "../../../contexts/auth";

interface Objectives {
  email: string;
  job: string;
  work_model: string;
  salary_expectation: string;
  distance_radius: number;
}

export function CandidateObjectives() {
  const navigation = useNavigation<any>();
  const [email, setEmail] = React.useState("");

  const { firstTime, loading,updateFirstTime } = useAuth();

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

    const objectives: Objectives = {
      email: email,
      job: positions.toString(),
      work_model: workModel.toString(),
      salary_expectation: salary,
      distance_radius: distance,
    };

    console.log(objectives);

    api
      .post("candidate/objective", { objectives })
      .then((response) => {
        Alert.alert("Sucesso", "Objetivos cadastrados com sucesso.");
        
       
        // Atualize o estado de `firstTime` para false após o cadastro
        updateFirstTime();

        // Navega para a Home após atualizar o estado de `firstTime`
        navigation.dispatch(
          StackActions.replace('Home') // Redefine a navegação para a tela Home
        );
      })
      .catch((error) => {
        Alert.alert("Erro", "Erro ao cadastrar objetivos." + error);
        console.log(error);
      });
      
  };

  const [isEditingSalary, setIsEditingSalary] = React.useState(false);
  const [salary, setSalary] = React.useState("3500,00");

  const handleEditSalary = () => {
    setIsEditingSalary(true);
  };

  const handleSaveSalary = () => {
    // Logica para salvar o salário no backend ou estado
    setIsEditingSalary(false);
  };

  const [positions, setPositions] = React.useState<string[]>([]);
  const [newPosition, setNewPosition] = React.useState("");
  const [isAddingPosition, setIsAddingPosition] = React.useState(false);

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

  const [distance, setDistance] = React.useState(20); // Estado para o valor da distância

  const [workModel, setWorkModel] = React.useState<string[]>([]); // Estado para o modelo de trabalho
  const [open, setOpen] = React.useState(false); // Estado para abrir/fechar o dropdown

  // Função para remover um modelo de trabalho
  const handleRemoveWorkModel = (value: string) => {
    const updatedWorkModel = workModel.filter((item) => item !== value);
    setWorkModel(updatedWorkModel);
  };

  return (
    <View style={styles.container}>
      <Image source={logoSmall} style={styles.imageLogo} resizeMode="stretch" />

      <View style={styles.content}>
        <Text style={styles.title}>Preferências</Text>

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
        
      </View>

      <TouchableOpacity style={styles.buttonPrimary} onPress={handleNavigate}>
          <Text style={styles.textbuttonPrimary}>Continuar</Text>
        </TouchableOpacity>
    </View>
  );
}
