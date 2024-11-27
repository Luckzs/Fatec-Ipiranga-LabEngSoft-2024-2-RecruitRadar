import useAsyncStorage from "@react-native-async-storage/async-storage";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
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

interface Study {
  email: string;
  EduInst: string;
  level: string;
  course: string;
  situation: string;
  startDate: string;
  endDate: string;
}

interface User {
  email: string;
}

export function CandidateStudy() {
  const [qualifications, setQualifications] = React.useState<Study[]>([]);
  const [EduInst, setEduInst] = React.useState("");
  const [level, setLevel] = React.useState("");
  const [course, setCourse] = React.useState("");
  const [situation, setSituation] = React.useState("");
  const [email, setEmail] = React.useState("");

  const [endDate, setEndDate] = React.useState(new Date());
  const [showStartDatePicker, setShowStartDatePicker] = React.useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = React.useState(false);
  const [isStudyListVisible, setIsStudyListVisible] = React.useState(true);

  const navigation = useNavigation<any>();
  const today = new Date();
  const defaultBirthDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const [startDate, setStartDate] = React.useState(new Date());

  const [isLoading, setIsLoading] = React.useState(false); // Ações específicas como login



  const isSameDate = (date1: Date, date2: Date) => {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  };

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

  const handleAddStudy = async () => {
    if (!level || !EduInst) {
      Alert.alert("Erro", "Preencha todos os campos obrigatórios.");
      return;
    }

    const userEmail = await useAsyncStorage
      .getItem("@RRAuth:user")
      .then((response) => JSON.parse(response || "{}").email);

    const newStudy: Study = {
      email: userEmail,
      EduInst,
      level,
      course,
      situation,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
    };

    setQualifications([...qualifications, newStudy]);

    // Limpa os campos
    setEduInst("");
    setLevel("");
    setCourse("");
    setSituation("");
    setStartDate(new Date());
    setEndDate(new Date());
  };

  const handleRemoveStudy = (index: number) => {
    Alert.alert(
      "Confirmação",
      "Tem certeza que deseja remover esta qualificação?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Remover",
          onPress: () => {
            const updatedQualifications = qualifications.filter(
              (_, i) => i !== index
            );
            setQualifications(updatedQualifications);
          },
          style: "destructive",
        },
      ]
    );
  };

  const toggleStudyListVisibility = () => {
    setIsStudyListVisible(!isStudyListVisible);
  };

  const handleSubmit = () => {
    if (qualifications.length === 0) {
      Alert.alert("Erro", "Adicione pelo menos uma qualificação.");
      return;
    }

    setIsLoading(true);
    api.post("/candidate/study", { qualifications })
      .then(() => {
        setQualifications([]);
        setIsLoading(false);
        Alert.alert("Sucesso", "Qualificações salvas com sucesso!");
        navigation.navigate("CandidateSkillLanguage");
      })
      .catch((error) => {
        setIsLoading(false);
        Alert.alert(
          "Erro",
          "Erro ao salvar as qualificações: " + error.message
        );
      }).finally(() => {
        setIsLoading(false);
      }
      );
  };

  const handleSkip = () => {
    Alert.alert('Atenção', 
      "Para que já possamos recomendar vagas mais adequadas ao seu perfil, é ideal que você preencha todas as informações. "
      + ' Gostaria de continuar mesmo assim?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Continuar', onPress: () => navigation.navigate('CandidateSkillLanguage') },
    ]);
  };

  if(isLoading) {
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

        <Text style={styles.title}>Adicionar Formações Acadêmicas</Text>

        <View style={styles.inputscontainer}>
          <Text style={styles.label}>Instituição de Ensino*:</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex: Fatec Ipiranga *"
            value={EduInst}
            onChangeText={setEduInst}
            placeholderTextColor={"#737380C2"}
          />

          <Text style={styles.label}>Diploma*:</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={level}
              style={styles.input}
              onValueChange={setLevel}
            >
              <Picker.Item label="Ex:Ensino Fundamental *" value="" color="#737380C2" />
              <Picker.Item label="Ensino Fundamental (1º grau)" value="Ensino Fundamental (1º grau)" color="black"/>
              <Picker.Item label="Ensino Médio (2º Grau)" value="Ensino Médio (2º Grau)" color="black"/>
              <Picker.Item label="Curso Técnico" value="Curso Técnico" color="black"/>
              <Picker.Item label="Tecnólogo" value="Tecnólogo" color="black"/>
              <Picker.Item label="Graduação" value="Graduação" color="black"/>
              <Picker.Item label="Pós-Graduação" value="Pós-Graduação" color="black"/>
              <Picker.Item label="Mestrado" value="Mestrado" color="black"/>
              <Picker.Item label="Doutorado" value="Doutorado" color="black"/>
              <Picker.Item label="Pós-Doutorado" value="Pós-Doutorado" color="black"/>
              <Picker.Item label="Especialização" value="Especialização" color="black"/>
              <Picker.Item label="Curso extra-curricular / Profissionalizante" value="Curso extra-curricular / Profissionalizante" color="black"/>
            </Picker>
          </View>

          <Text style={styles.label}>Área de Estudo / Nome do Curso *:</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex: Análise e Desenvolvimento de Siste"
            value={course}
            onChangeText={setCourse}
            placeholderTextColor={"#737380C2"}
          />

          <Text style={styles.label}>Situação do Curso*:</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={situation}
              style={styles.input}
              onValueChange={setSituation}
            >
              <Picker.Item label="Situação *" value="" color="#737380C2" />
              <Picker.Item label="Cursando" value="Cursando" color="black"/>
              <Picker.Item label="Concluído" value="Concluído" color="black"/>
              <Picker.Item label="Incompleto" value="Incompleto" color="black"/>
            </Picker>
          </View>

          <Text style={styles.label}>Data de Início*:</Text>
          <View style={styles.dateinputContainer}>
            <Text
              style={isSameDate(startDate, defaultBirthDate) ? styles.placeholderdateinput : styles.dateInput} 
              onPress={() => setShowStartDatePicker(true)}
            >       
              {startDate.toLocaleDateString("pt-BR")}
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

          <Text style={styles.label}>Data de Termino*:</Text>
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
        </View>

        <TouchableOpacity
          style={styles.addbuttonPrimary}
          onPress={handleAddStudy}
        >
          <Text style={styles.addtextbuttonPrimary}>+ Adicionar Formação</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={toggleStudyListVisibility}>
          <Text style={styles.subtitle}>Formações Adicionadas</Text>
        </TouchableOpacity>

        {isStudyListVisible && qualifications.length > 0 && (
          <View style={styles.studyList}>
            {qualifications.map((study, index) => (
              <View key={index} style={styles.studyItem}>
                <Text style={styles.studyText}>Curso: {study.course}</Text>
                <Text style={styles.studyText}>Diploma: {study.level}</Text>
                <Text style={styles.studyText}>
                  Início:{" "}
                  {new Date(study.startDate).toLocaleDateString("pt-BR")}
                </Text>
                <Text style={styles.studyText}>
                  Término: {new Date(study.endDate).toLocaleDateString("pt-BR")}
                </Text>
                <TouchableOpacity onPress={() => handleRemoveStudy(index)}>
                  <Text style={styles.removeButton}>Remover</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}

        <TouchableOpacity style={styles.buttonPrimary} onPress={handleSubmit}>
          <Text style={styles.textbuttonPrimary}>Salvar Qualificações</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
