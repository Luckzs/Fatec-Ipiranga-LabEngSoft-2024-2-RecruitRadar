import useAsyncStorage from "@react-native-async-storage/async-storage";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { Button } from "../../../components/Button";
import api from "../../../services/api";
import logoSmall from "../../../assets/LogoBetterSmall.png";
import { styles } from "./styles";
import {
  Ionicons,
  FontAwesome5,
  MaterialIcons,
  Feather,
} from "@expo/vector-icons";

interface Experience {
  email: string;
  title: string;
  company_name: string;
  startDate: string;
  endDate: string;
  isCurrently: boolean;
}

interface User {
  //name: string;
  email: string;
}

export function CandidateExperience() {
  const [experiences, setExperiences] = React.useState<Experience[]>([]);
  const [title, setTitle] = React.useState("");
  const [company_name, setCompanyName] = React.useState("");
  const [email, setEmail] = React.useState("");

  const [endDate, setEndDate] = React.useState<Date>(new Date());
  const [showStartDatePicker, setShowStartDatePicker] = React.useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = React.useState(false);
  const [isExperienceListVisible, setIsExperienceListVisible] =
    React.useState(true); // Novo estado
  const [isCurrently, setisCurrently] = React.useState(false);

  const navigation = useNavigation<any>();  
  const today = new Date();
  const defaultBirthDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const [startDate, setStartDate] = React.useState(new Date());

  const [isLoading, setIsLoading] = React.useState(false); // Ações específicas como login

  const onStartDateChange = (
    event: DateTimePickerEvent,
    selectedDate?: Date
  ) => {
    const currentDate = selectedDate || startDate;
    setShowStartDatePicker(Platform.OS === "ios");
    setStartDate(currentDate);
  };

  const onEndDateChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    const currentDate = selectedDate || endDate;
    setShowEndDatePicker(Platform.OS === "ios");
    setEndDate(currentDate);
  };

  const handleAddExperience = async () => {
    if (!company_name || !title) {
      Alert.alert("Erro", "Todos os campos são obrigatórios.");
      return;
    }

    const email = await useAsyncStorage
      .getItem("@RRAuth:user")
      .then((response) => {
        return JSON.parse(response || "{}").email;
      });

    const newExperience: Experience = {
      email,
      title,
      company_name,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      isCurrently,
    };
    setExperiences([...experiences, newExperience]);

    // Limpa os campos após adicionar uma experiência
    setCompanyName("");
    setTitle("");
    setStartDate(new Date());
    setEndDate(new Date());
    setEmail("");
  };

  const handleRemoveExperience = (index: number) => {
    Alert.alert(
      "Confirmação",
      "Tem certeza que deseja remover esta experiência?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Remover",
          onPress: () => {
            const updatedExperiences = experiences.filter(
              (_, expIndex) => expIndex !== index
            );
            setExperiences(updatedExperiences);
          },
          style: "destructive",
        },
      ]
    );
  };

  const toggleExperienceListVisibility = () => {
    setIsExperienceListVisible((prevState) => !prevState);
  };

  const handleSubmit = () => {
    if (experiences.length === 0) {
      Alert.alert("Erro", "Adicione pelo menos uma experiência profissional.");
      return;
    }

    console.log(experiences);

    // Envia as informações para a API
    setIsLoading(true);
    api.post("/candidate/experience", { experiences })
      .then((response) => {
        setExperiences([]); // Limpa a lista de experiências
        setIsLoading(false);
        Alert.alert("Sucesso", "Experiências salvas com sucesso!");
        console.log(response);
        navigation.navigate("CandidateStudy");
      })
      .catch((error) => {
        setIsLoading(false);
        //console.error(error);
        Alert.alert("Erro", "Erro ao salvar experiências: " + error.message);
      }).finally(() => {
        setIsLoading(false);
      });
  };

  const toggleCheckbox = () => {
    setisCurrently(!isCurrently);
    console.log(!isCurrently);
  };

  const handleSkip = () => {
    Alert.alert('Atenção', 
      "Para que já possamos recomendar vagas mais adequadas ao seu perfil, é ideal que você preencha todas as informações. "
      + ' Gostaria de continuar mesmo assim?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Continuar', onPress: () => navigation.navigate('CandidateStudy') },
    ]);
  };

  const isSameDate = (date1: Date, date2: Date) => {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  };

 
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
    <ScrollView style={styles.container}>

      <View style={styles.header}>
        <TouchableOpacity
          onPress={handleSkip}
          style={styles.backiconContainer}
        >
          <Ionicons
            name="arrow-forward"
            size={24}
            style={styles.backIcon}
            color={"#FFFFFF"}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>


        <Image
          source={logoSmall}
          style={styles.imageLogo}
          resizeMode="stretch"
        />

        <Text style={styles.title}>Adicionar Experiência</Text>

        <View style={styles.inputscontainer}>
          <Text style={styles.label}>Titulo*:</Text>
          <TextInput
            style={styles.input}
            placeholder="Titulo *"
            value={title}
            onChangeText={setTitle}
          />

          <Text style={styles.label}>Empresa ou Organização*:</Text>
          <TextInput
            style={styles.input}
            placeholder="Nome da Empresa *"
            value={company_name}
            onChangeText={setCompanyName}
          />

          <Text style={styles.label}>Data de Inicio*: </Text>
          <View style={styles.dateinputContainer}>
            <Text
              style={isSameDate(startDate, defaultBirthDate) ? styles.placeholderdateinput : styles.dateInput} 
              onPress={() => setShowStartDatePicker(true)}
            >
              {startDate.toLocaleDateString("pt-BR")} {"\n"}
            </Text>
            {showStartDatePicker && (
              <DateTimePicker
                value={startDate}
                mode="date"
                display="default"
                onChange={onStartDateChange}
              />
            )}
            <Ionicons name={"calendar"} size={24} color={"#737380C2"} />
          </View>

          <TouchableOpacity
            style={styles.checkboxContainer}
            onPress={toggleCheckbox}
          >
            <View style={styles.checkbox}>
              {isCurrently && <View style={styles.checked} />}
            </View>
            <Text style={styles.checkboxLabel}>
              Trabalho atualmente nesta empresa
            </Text>
          </TouchableOpacity>
          <Text style={styles.label}></Text>

          {!isCurrently && (
            <>
              <Text style={styles.label}>Data de Termino*: </Text>
              <View style={styles.dateinputContainer}>
                <Text
                  style={isSameDate(endDate, defaultBirthDate) ? styles.placeholderdateinput : styles.dateInput} 
                  onPress={() => setShowEndDatePicker(true)}
                >
                  
                  {endDate.toLocaleDateString("pt-BR")} {"\n"}
                </Text>
                {showEndDatePicker && (
                  <DateTimePicker
                    value={endDate}
                    mode="date"
                    display="default"
                    onChange={onEndDateChange}
                  />
                )}
                <Ionicons name={"calendar"} size={24} color={"#737380C2"} />
              </View>
            </>
          )}
        </View>

        <TouchableOpacity
          style={styles.addbuttonPrimary}
          onPress={handleAddExperience}
        >
          <Text style={styles.addtextbuttonPrimary}>+ Adicionar Experiência</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={toggleExperienceListVisibility}>
          <Text style={styles.subtitle}>Experiências Adicionadas:</Text>
        </TouchableOpacity>

        {isExperienceListVisible && experiences.length > 0 && (
          <View style={styles.experienceList}>
            {experiences.map((exp, index) => {
              // Define today's date in ISO format without the time part for comparison
              const todayDateISO = new Date().toISOString().split("T")[0];
              const endDateISO = new Date(exp.endDate)
                .toISOString()
                .split("T")[0];

              return (
                <View key={index} style={styles.experienceItem}>
                  <Text style={styles.experienceText}>
                    Empresa: {exp.company_name}
                  </Text>
                  <Text style={styles.experienceText}>Título: {exp.title}</Text>
                  <Text style={styles.experienceText}>
                    Data de Inicio:{" "}
                    {new Date(exp.startDate).toLocaleDateString("pt-BR")}
                  </Text>
                  <Text style={styles.experienceText}>
        
                    {endDateISO === todayDateISO
                      ? "Em Exercicio Atualmente"
                      : "Data de Término: "+new Date(exp.endDate).toLocaleDateString("pt-BR")}
                  </Text>
                  <TouchableOpacity
                    onPress={() => handleRemoveExperience(index)}
                  >
                    <Text style={styles.removeButton}>Remover</Text>
                  </TouchableOpacity>
                </View>
              );
            })}
          </View>
        )}

        <TouchableOpacity style={styles.buttonPrimary} onPress={handleSubmit}>
          <Text style={styles.textbuttonPrimary}>Salvar Experiências</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
