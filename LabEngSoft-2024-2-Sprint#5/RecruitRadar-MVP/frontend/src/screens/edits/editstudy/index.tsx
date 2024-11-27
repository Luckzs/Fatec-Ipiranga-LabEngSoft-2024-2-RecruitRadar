import React from "react";
import {
  View,
  Text,
  Image,
  Alert,
  ScrollView,
  TouchableOpacity,
  Platform,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { styles } from "./styles";
import logoSmall from "../../../assets/LogoBetterSmall.png";
import { TextInput } from "react-native-gesture-handler";
import { useNavigation, RouteProp, useRoute } from "@react-navigation/native";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import { Button } from "../../../components/Button";
import { MaterialIcons } from "@expo/vector-icons";
import api from "../../../services/api";
import useAsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";

interface StudyProfiledata {
  education: string;
}

interface CandidateStudy {
  candidate_study_id: string;
  course_name: string;
  institution_name: string;
  start_date: string;
  completion_date: string;
  situation: string;
  Study: StudyProfiledata;
}

interface ProfileData {
  candidate_id: string;
  full_name: string;
  distance_radius: number;
  CPF: string;
  pcd: boolean;
  birth_date: string;
  address: string;
  city: string;
  state: string;
  postal_code: string;
  candidateStudies: CandidateStudy[];
}

interface Study {
  candidate_study_id: string;
  EduInst: string;
  level: string;
  course: string;
  situation: string;
  startDate: string;
  endDate: string;
  isNew?: boolean;
}

type RootStackParamList = {
  EditCandidateStudy: { profileData: ProfileData };
};

type EditCandidateStudyRouteProp = RouteProp<
  RootStackParamList,
  "EditCandidateStudy"
>;

export function EditCandidateStudy() {
  const navigation = useNavigation<any>();
  const route = useRoute<EditCandidateStudyRouteProp>();
  const { profileData } = route.params;

  const [qualifications, setQualifications] = React.useState<Study[]>(
    profileData.candidateStudies.map((study) => ({
      candidate_study_id: study.candidate_study_id,
      EduInst: study.institution_name,
      level: study.Study.education,
      course: study.course_name,
      situation: study.situation,
      startDate: study.start_date,
      endDate: study.completion_date,
      isNew: false,
    }))
  );

  const [selectedStudy, setSelectedStudy] = React.useState<Study | null>(null);
  const [EduInst, setEduInst] = React.useState("");
  const [level, setLevel] = React.useState("");
  const [course, setCourse] = React.useState("");
  const [situation, setSituation] = React.useState("");
  const [startDate, setStartDate] = React.useState(new Date());
  const [endDate, setEndDate] = React.useState(new Date());
  const [showStartDatePicker, setShowStartDatePicker] = React.useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    if (selectedStudy) {
      setEduInst(selectedStudy.EduInst);
      setLevel(selectedStudy.level);
      setCourse(selectedStudy.course);
      setSituation(selectedStudy.situation);
      setStartDate(new Date(selectedStudy.startDate));
      setEndDate(new Date(selectedStudy.endDate));
    }
  }, [selectedStudy]);

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

  const handleAddStudy = () => {
    if (qualifications.length >= 3) {
      Alert.alert(
        "Limite Atingido",
        "Você já atingiu o limite de 3 formações."
      );
      return;
    }

    const newStudy: Study = {
      candidate_study_id:
        Math.random().toString(36).substring(2) + Date.now().toString(36),
      EduInst,
      level,
      course,
      situation,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      isNew: true, // Indica que o item é novo e não vem do banco de dados
    };

    setQualifications([...qualifications, newStudy]);

    setEduInst("");
    setLevel("");
    setCourse("");
    setSituation("");
    setStartDate(new Date());
    setEndDate(new Date());
    setSelectedStudy(null);
  };

  const handleUpdateStudy = () => {
    if (!selectedStudy) return;

    const updatedStudy = {
      ...selectedStudy,
      EduInst,
      level,
      course,
      situation,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
    };

    const updatedQualifications = qualifications.map((study) =>
      study.candidate_study_id === selectedStudy.candidate_study_id
        ? updatedStudy
        : study
    );

    setQualifications(updatedQualifications);
    setSelectedStudy(null);
    handleResetSelection();
  };

  const handleRemoveStudy = (candidate_study_id: string) => {
    // Verifica se há apenas uma formação acadêmica na lista
    if (qualifications.length <= 1) {
      Alert.alert("Erro", "É necessário ter pelo menos uma qualificação.");
      return;
    }

    // Encontra o item que deseja ser removido
    const studyToRemove = qualifications.find(
      (study) => study.candidate_study_id === candidate_study_id
    );

    if (studyToRemove?.isNew) {
      // Remove o item da lista localmente se for novo
      const updatedQualifications = qualifications.filter(
        (study) => study.candidate_study_id !== candidate_study_id
      );
      setQualifications(updatedQualifications);

      // Resetar a seleção e fechar o campo de edição
      handleResetSelection();
      return;
    }

    // Se o item tem um ID (já existe no banco de dados), faz a requisição de exclusão
    Alert.alert(
      "Confirmar Exclusão",
      "Tem certeza de que deseja excluir esta formação?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Excluir",
          onPress: async () => {
            try {
              await api.delete(`/candidate/study/${candidate_study_id}`);

              const updatedQualifications = qualifications.filter(
                (study) => study.candidate_study_id !== candidate_study_id
              );
              setQualifications(updatedQualifications);

              // Resetar a seleção e fechar o campo de edição
              handleResetSelection();

              Alert.alert("Sucesso", "Formação excluída com sucesso!");
            } catch (error) {
              console.error(error);
              Alert.alert("Erro", "Erro ao excluir a formação: " + error);
            }
          },
        },
      ]
    );
  };

  const handleResetSelection = () => {
    setSelectedStudy(null);
    setEduInst("");
    setLevel("");
    setCourse("");
    setSituation("");
    setStartDate(new Date());
    setEndDate(new Date());
  };

  const handleSubmit = async () => {
    if (qualifications.length === 0) {
      Alert.alert("Erro", "Adicione pelo menos uma qualificação.");
      return;
    }

    console.log(qualifications);

    const email = await useAsyncStorage
      .getItem("@RRAuth:user")
      .then((response) => {
        return JSON.parse(response || "{}").email;
      });

    setIsLoading(true);
    api.put(`/candidate/study/${email}`, { qualifications })
      .then((response) => {
        setIsLoading(false);
        Alert.alert("Sucesso", "Qualificações salvas com sucesso!");
        console.log(response);
        navigation.navigate('profileScreen');
      })
      .catch((error) => {
        setIsLoading(false);
        console.error(error);
        Alert.alert(
          "Erro",
          "Erro ao salvar as qualificações: " + error.message
        );
      }).finally(() => {
        setIsLoading(false);
      });
    
  };

  const handleNav = () => {
    navigation.goBack();
  };

  const renderStudyItem = ({ item }: { item: Study }) => (
    <View style={styles.studyItem}>
      <TouchableOpacity
        style={styles.studyContent}
        onPress={() => setSelectedStudy(item)}
      >
        <Text style={styles.studyText}>Nome do Curso: {item.course}</Text>
        <Text style={styles.studyText}>Diploma: {item.level}</Text>
        <Text style={styles.studyText}>
          Data de Início: {new Date(item.startDate).toLocaleDateString("pt-BR")}
        </Text>
        <Text style={styles.studyText}>
          Data de Término: {new Date(item.endDate).toLocaleDateString("pt-BR")}
        </Text>
        <Text style={styles.studyText}>Situação: {item.situation}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.removeButtonList}
        onPress={() => handleRemoveStudy(item.candidate_study_id)}
      >
        <MaterialIcons name="delete" size={24} color="#0262A6" />
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
        data={qualifications}
        renderItem={renderStudyItem}
        keyExtractor={(item) => item.candidate_study_id}
        ListHeaderComponent={
          <View style={styles.headerContainer}>
            <Image
              source={logoSmall}
              style={styles.imageLogo}
              resizeMode="stretch"
            />

            {/* Botão de Retorno */}
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

            <Text style={styles.title}>Editar Formações Acadêmicas</Text>
          </View>
        }
        ListFooterComponent={
          <>
            {qualifications.length < 3 && !selectedStudy && (
              <TouchableOpacity
                style={styles.addButton}
                onPress={handleAddStudy}
              >
                <MaterialIcons name="add-circle" size={40} color="#0262A6" />
              </TouchableOpacity>
            )}

            {selectedStudy ? (
              <>
                <View style={styles.editContainer}>
                  <Text style={styles.label}>Instituição *{"\n"}</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Ex.: Faculdade de Tecnologia"
                    value={EduInst}
                    onChangeText={setEduInst}
                  />

                  <Text style={styles.label}>Diploma*:{"\n"}</Text>
                  <View style={styles.pickerContainer}>
                    <Picker
                      selectedValue={level}
                      style={styles.input}
                      onValueChange={setLevel}
                    >
                      <Picker.Item label="Ex:Ensino Fundamental *" value=""  />
                      <Picker.Item label="Ensino Fundamental" value="Ensino Fundamental" color="black"/>
                      <Picker.Item label="Ensino Médio" value="Ensino Médio" color="black"/>
                      <Picker.Item label="Curso Técnico" value="Curso Técnico" color="black"/>
                      <Picker.Item label="Graduação" value="Graduação" color="black"/>
                      <Picker.Item label="Pós-Graduação" value="Pós-Graduação" color="black"/>
                      <Picker.Item label="Mestrado" value="Mestrado" color="black"/>
                      <Picker.Item label="Doutorado" value="Doutorado" color="black"/>
                      <Picker.Item label="Pós-Doutorado" value="Pós-Doutorado" color="black"/>
                      <Picker.Item label="Especialização" value="Especialização" color="black"/>
                    </Picker>
                  </View>

                  <Text style={styles.label}>
                    Área de Estudo / Nome do Curso *{"\n"}
                  </Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Ex: Matemática"
                    value={course}
                    onChangeText={setCourse}
                  />

                  <Text style={styles.label}>Situação {"\n"}</Text>
                  <View style={styles.pickerContainer}>
                  <Picker
                    selectedValue={situation}
                    style={styles.picker}
                    onValueChange={(itemValue) => setSituation(itemValue)}
                  >
                    <Picker.Item label="Cursando" value="Cursando" />
                    <Picker.Item label="Finalizado" value="Finalizado" />
                    <Picker.Item label="Incompleto" value="Incompleto" />
                  </Picker>
                  </View>

                  <Text style={styles.label}>Data de Início:{"\n"}</Text>
                  <Text
                    style={styles.input}
                    onPress={() => setShowStartDatePicker(true)}
                  >
                    {startDate.toLocaleDateString('pt-BR')}
                  </Text>
                  {showStartDatePicker && (
                    <DateTimePicker
                      value={startDate}
                      mode="date"
                      display="default"
                      onChange={onStartDateChange}
                    />
                  )}

                  <Text style={styles.label}>Data de Término:{"\n"}</Text>
                  <Text
                    style={styles.input}
                    onPress={() => setShowEndDatePicker(true)}
                  >
                    {endDate.toLocaleDateString('pt-BR')}
                  </Text>
                  {showEndDatePicker && (
                    <DateTimePicker
                      value={endDate}
                      mode="date"
                      display="default"
                      onChange={onEndDateChange}
                    />
                  )}
                </View>
                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    style={styles.addbuttonPrimary}
                    onPress={handleResetSelection}
                  >
                    <Text style={styles.addtextbuttonPrimary}>Voltar</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.addbuttonPrimary}
                    onPress={handleUpdateStudy}
                  >
                    <Text style={styles.addtextbuttonPrimary}>Adicionar</Text>
                  </TouchableOpacity>
                </View>
              </>
            ) : (
              qualifications.length > 0 && (
                <TouchableOpacity
                  style={styles.refreshbuttonPrimary}
                  onPress={handleSubmit}
                >
                  <Text style={styles.refreshtextbuttonPrimary}>Salvar Formações</Text>
                </TouchableOpacity>
              )
            )}
          </>
        }
        style={styles.content}
      />
    </View>
  );
}
