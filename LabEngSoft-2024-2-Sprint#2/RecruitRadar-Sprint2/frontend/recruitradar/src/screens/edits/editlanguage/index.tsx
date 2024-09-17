import React, { useState } from "react";
import {
  View,
  Text,
  Alert,
  ScrollView,
  TouchableOpacity,
  FlatList,
  TextInput,
  Image,
} from "react-native";
import { styles } from "./styles";
import logoSmall from "../../../assets/LogoSmall.png";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation, RouteProp, useRoute } from "@react-navigation/native";
import useAsyncStorage from "@react-native-async-storage/async-storage";
import api from "../../../services/api";
import { Picker } from "@react-native-picker/picker";
import { Ionicons } from "@expo/vector-icons";

interface LanguageProfileData {
  course_name: string;
}

interface CandidateLanguage {
  candidate_language_id: string;
  level: string;
  Language: LanguageProfileData;
}

interface ProfileData {
  candidate_id: string;
  full_name: string;
  distance_radius: number;
  sex: string;
  CPF: string;
  pcd: boolean;
  birth_date: string;
  address: string;
  city: string;
  state: string;
  postal_code: string;
  candidateLanguages: CandidateLanguage[];
}

interface Language {
  candidate_language_id: string;
  course_name: string;
  level: string;
  isNew?: boolean;
}

type RootStackParamList = {
  EditCandidateLanguage: { profileData: ProfileData };
};

type EditCandidateLanguageRouteProp = RouteProp<
  RootStackParamList,
  "EditCandidateLanguage"
>;

export function EditCandidateLanguage() {
  const navigation = useNavigation();
  const route = useRoute<EditCandidateLanguageRouteProp>();
  const { profileData } = route.params;

  const [languages, setLanguages] = useState<Language[]>(
    profileData.candidateLanguages.map((language) => ({
      candidate_language_id: language.candidate_language_id,
      level: language.level,
      course_name: language.Language.course_name,
      isNew: false,
    }))
  );

  const [courseName, setCourseName] = useState("");
  const [level, setLevel] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState<Language | null>(
    null
  );

  const handleAddLanguage = () => {
    if (languages.length >= 5) {
      Alert.alert("Erro", "Você atingiu o limite de linguagens.");
      return;
    }

    const newLanguage: Language = {
      candidate_language_id:
        (Math.random() + 1).toString(36).substring(2) + Date.now().toString(36), // Gerar um ID único para a nova linguagem
      course_name: "",
      level: "",
      isNew: true,
    };

    setLanguages([...languages, newLanguage]);
    setSelectedLanguage(newLanguage); // Define a nova linguagem como selecionada
    setCourseName("");
    setLevel("");
  };

  const handleRemoveLanguage = (candidate_language_id: string) => {
    if (languages.length <= 1) {
      Alert.alert("Erro", "Você deve ter pelo menos uma linguagem.");
      return;
    }

    const languageToRemove = languages.find(
      (language) => language.candidate_language_id === candidate_language_id
    );

    if (languageToRemove?.isNew) {
      const updatedLanguages = languages.filter(
        (language) => language.candidate_language_id !== candidate_language_id
      );
      setLanguages(updatedLanguages);
      if (
        selectedLanguage &&
        candidate_language_id === selectedLanguage.candidate_language_id
      ) {
        setSelectedLanguage(null);
        setCourseName("");
        setLevel("");
      }
      return;
    }

    Alert.alert(
      "Confirmação",
      "Tem certeza que deseja remover esta linguagem?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Remover",
          onPress: async () => {
            try {
              await api.delete(`/candidate/language/${candidate_language_id}`);

              const updatedLanguages = languages.filter(
                (language) =>
                  language.candidate_language_id !== candidate_language_id
              );
              setLanguages(updatedLanguages);

              Alert.alert("Sucesso", "Linguagem excluída com sucesso!");
            } catch (error) {
              console.error(error);
              Alert.alert("Erro", "Erro ao excluir a linguagem: " + error);
            }
          },
          style: "destructive",
        },
      ]
    );
  };

  const handleEditLanguage = (language: Language) => {
    setSelectedLanguage(language);
    setCourseName(language.course_name);
    setLevel(language.level);
  };

  const handleUpdateLanguage = () => {
    if (selectedLanguage) {
      const updatedLanguages = languages.map((language) =>
        language.candidate_language_id ===
        selectedLanguage.candidate_language_id
          ? { ...language, course_name: courseName, level }
          : language
      );
      setLanguages(updatedLanguages);
      setSelectedLanguage(null);
      setCourseName("");
      setLevel("");
    }
  };

  const handleSubmit = async () => {
    if (languages.length === 0) {
      Alert.alert("Erro", "Adicione pelo menos uma linguagem.");
      return;
    }

    try {
      const email = await useAsyncStorage
        .getItem("@RRAuth:user")
        .then((response) => JSON.parse(response || "{}").email);

      console.log(languages);

      await api.put(`/candidate/language/${email}`, { languages });

      Alert.alert("Sucesso", "Informações salvas com sucesso!");
      navigation.goBack();
    } catch (error) {
      console.error(error);
      Alert.alert("Erro", "Erro ao salvar as informações: " + error);
    }
  };

  const handleNav = () => {
    navigation.goBack();
  };

  const renderLanguageItem = ({ item }: { item: Language }) => (
    <View style={styles.skillItem}>
      <TouchableOpacity
        style={styles.skillContent}
        onPress={() => handleEditLanguage(item)}
      >
        <Text style={styles.skillText}>Linguagem: {item.course_name}</Text>
        <Text style={styles.skillText}>Nível: {item.level}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.removeButtonList}
        onPress={() => handleRemoveLanguage(item.candidate_language_id)}
      >
        <MaterialIcons name="delete" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={languages}
        renderItem={renderLanguageItem}
        keyExtractor={(item) => item.candidate_language_id}
        ListHeaderComponent={
          <View style={styles.headerContainer}>
            <Image
              source={logoSmall}
              style={styles.imageLogo}
              resizeMode="stretch"
            />
            <Text style={styles.title}>Editar Linguagens</Text>
            {/* Botão de Retorno */}
            <TouchableOpacity style={styles.backButton} onPress={handleNav}>
              <Ionicons name="arrow-back" size={24} color="black" />
            </TouchableOpacity>
          </View>
        }
        ListFooterComponent={
          <>
            {languages.length < 5 && !selectedLanguage && (
              <TouchableOpacity
                style={styles.addButton}
                onPress={handleAddLanguage}
              >
                <MaterialIcons name="add-circle" size={40} color="black" />
              </TouchableOpacity>
            )}

            {selectedLanguage ? (
              <>
                <View style={styles.editContainer}>
                  <Text style={styles.label}>Curso *{"\n"}</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Ex: Espanhol"
                    value={courseName}
                    onChangeText={setCourseName}
                  />
                  <Text style={styles.label}>Nível *{"\n"}</Text>
                  <View style={styles.pickerContainer}>
                    <Picker
                      selectedValue={level}
                      style={styles.input}
                      onValueChange={(itemValue, itemIndex) =>
                        setLevel(itemValue)
                      }
                    >
                      <Picker.Item label="" value="" />
                      <Picker.Item label="Iniciante" value="Iniciante" />
                      <Picker.Item
                        label="Intermediário"
                        value="Intermediário"
                      />
                      <Picker.Item label="Superior" value="Superior" />
                    </Picker>
                  </View>
                </View>

                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    style={styles.resetButton}
                    onPress={() => setSelectedLanguage(null)}
                  >
                    <Text style={styles.buttonText}>Cancelar</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.saveButton}
                    onPress={handleUpdateLanguage}
                  >
                    <Text style={styles.buttonText}>Adicionar</Text>
                  </TouchableOpacity>
                </View>
              </>
            ) : (
              languages.length > 0 && (
                <TouchableOpacity
                  style={styles.refreshButton}
                  onPress={handleSubmit}
                >
                  <Text style={styles.buttonText}>Salvar Linguagens</Text>
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
