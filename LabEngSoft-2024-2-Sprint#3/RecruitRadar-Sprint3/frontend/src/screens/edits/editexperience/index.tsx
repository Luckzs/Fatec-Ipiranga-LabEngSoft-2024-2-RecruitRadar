import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  Image,
  Alert,
  ScrollView,
  TouchableOpacity,
  Platform,
  FlatList,
  TextInput,
} from 'react-native';
import logoSmall from '../../../assets/LogoSmall.png';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { MaterialIcons } from '@expo/vector-icons';
import api from '../../../services/api';
import useAsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from './styles';
import { Ionicons } from '@expo/vector-icons';

interface Experience {
  candidate_experience_id: string;
  title: string;
  company_name: string;
  start_date: string;
  end_date: string;
  isNew?: boolean;
}

interface ExperienceProfileData {
  title: string;
}

interface CandidateExperience {
  candidate_experience_id: string;
  company_name: string;
  start_date: string;
  end_date: string;
  period: string;
  Experience: ExperienceProfileData;
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
  candidateExperiences: CandidateExperience[];
}

type RootStackParamList = {
  EditCandidateExperience: { profileData: ProfileData };
};

type EditCandidateExperienceRouteProp = RouteProp<RootStackParamList, 'EditCandidateExperience'>;

export function EditCandidateExperience() {
  const navigation = useNavigation<any>();
  const route = useRoute<EditCandidateExperienceRouteProp>();
  const { profileData } = route.params;

  const [experiences, setExperiences] = useState<Experience[]>(profileData.candidateExperiences.map(exp => ({
    candidate_experience_id: exp.candidate_experience_id,
    title: exp.Experience.title,
    company_name: exp.company_name,
    start_date: exp.start_date,
    end_date: exp.end_date,
    isNew: false,
  })));

  const [selectedExperience, setSelectedExperience] = useState<Experience | null>(null);
  const [title, setTitle] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);

  /*useEffect(() => {
    if (selectedExperience) {
      setTitle(selectedExperience.title);
      setCompanyName(selectedExperience.company_name);
      setStartDate(new Date(selectedExperience.start_date));
      setEndDate(new Date(selectedExperience.end_date));
    }

  }, [selectedExperience]);*/

  // Função para carregar e ordenar as experiências
  const loadExperiences = useCallback(() => {
    const initialExperiences = profileData.candidateExperiences.map(exp => ({
      candidate_experience_id: exp.candidate_experience_id,
      title: exp.Experience.title,
      company_name: exp.company_name,
      start_date: exp.start_date,
      end_date: exp.end_date,
      isNew: false,
    }));

    // Ordena as experiências por data de início em ordem crescente
    const sortedExperiences = [...initialExperiences].sort(
      (a, b) => new Date(a.start_date).getTime() - new Date(b.start_date).getTime()
    );

    setExperiences(sortedExperiences);
  }, [profileData]);

  useEffect(() => {
    loadExperiences();
  }, [loadExperiences]); // Executa apenas uma vez na montagem do componente

  useEffect(() => {
    // Carrega a experiência selecionada para edição
    if (selectedExperience) {
      setTitle(selectedExperience.title);
      setCompanyName(selectedExperience.company_name);
      setStartDate(new Date(selectedExperience.start_date));
      setEndDate(new Date(selectedExperience.end_date));
    }
  }, [selectedExperience]);

  const onStartDateChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    const currentDate = selectedDate || startDate;
    setShowStartDatePicker(Platform.OS === 'ios');
    setStartDate(currentDate);
  };

  const onEndDateChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    const currentDate = selectedDate || endDate;
    setShowEndDatePicker(Platform.OS === 'ios');
    setEndDate(currentDate);
  };

  const handleAddExperience = () => {
    if (experiences.length >= 5) {
      Alert.alert('Limite Atingido', 'Você já atingiu o limite de 5 experiências.');
      return;
    }

    const newExperience: Experience = {
      candidate_experience_id: Math.random().toString(36).substring(2) + Date.now().toString(36),
      title,
      company_name: companyName,
      start_date: startDate.toISOString(),
      end_date: endDate.toISOString(),
      isNew: true,
    };

    setExperiences([...experiences, newExperience]);

    setTitle('');
    setCompanyName('');
    setStartDate(new Date());
    setEndDate(new Date());
    setSelectedExperience(null);
  };

  const handleUpdateExperience = () => {
    if (!selectedExperience) return;

    const updatedExperience: Experience = {
      ...selectedExperience,
      title,
      company_name: companyName,
      start_date: startDate.toISOString(),
      end_date: endDate.toISOString(),
    };

    const updatedExperiences = experiences.map(exp =>
      exp.candidate_experience_id === selectedExperience.candidate_experience_id ? updatedExperience : exp
    );

    setExperiences(updatedExperiences);
    setSelectedExperience(null);
    handleResetSelection();
  };

  const handleRemoveExperience = (candidate_experience_id: string) => {
    if (experiences.length <= 1) {
      Alert.alert('Erro', 'É necessário ter pelo menos uma experiência.');
      return;
    }

    const experienceToRemove = experiences.find(exp => exp.candidate_experience_id === candidate_experience_id);
    // Se o item for novo (sem ID), remove apenas da lista de experiencias
    if (experienceToRemove?.isNew) {
      const updatedExperiences = experiences.filter(exp => exp.candidate_experience_id !== candidate_experience_id);
      setExperiences(updatedExperiences);

      handleResetSelection();
      return;
    }

    Alert.alert(
      'Confirmar Exclusão',
      'Tem certeza de que deseja excluir esta experiência?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Excluir',
          onPress: async () => {
            try {
              const email = await useAsyncStorage.getItem('@RRAuth:user')
                .then(response => {
                  return JSON.parse(response || '{}').email;
                });

              await api.delete(`/candidate/experience/${candidate_experience_id}`);

              const updatedExperiences = experiences.filter(exp => exp.candidate_experience_id !== candidate_experience_id);
              setExperiences(updatedExperiences);

              handleResetSelection();

              Alert.alert('Sucesso', 'Experiência excluída com sucesso!');
            } catch (error) {
              console.error(error);
              Alert.alert('Erro', 'Erro ao excluir a experiência: ' + error);
            }
          },
        },
      ]
    );
  };

  const handleResetSelection = () => {
    setSelectedExperience(null);
    setTitle('');
    setCompanyName('');
    setStartDate(new Date());
    setEndDate(new Date());
  };

  const handleSubmit = async () => {
    if (experiences.length === 0) {
      Alert.alert('Erro', 'Adicione pelo menos uma experiência.');
      return;
    }

    const email = await useAsyncStorage.getItem('@RRAuth:user')
      .then(response => {
        return JSON.parse(response || '{}').email;
      });

    console.log(experiences);
    console.log(email);

    api.put(`/candidate/experience/${email}`, { experiences })
      .then(response => {
        Alert.alert('Sucesso', 'Experiências salvas com sucesso!');
        console.log(response);
        navigation.navigate('profileScreen');
      })
      .catch(error => {
        console.error(error);
        Alert.alert('Erro', 'Erro ao salvar as experiências: ' + error.message);
      });

  };

  const handleNav = () => {
    navigation.goBack();
  };

  const renderExperienceItem = ({ item }: { item: Experience }) => (
    <View style={styles.experienceItem}>
      <TouchableOpacity style={styles.experienceContent} onPress={() => setSelectedExperience(item)}>
        <Text style={styles.experienceText}>Título: {item.title}</Text>
        <Text style={styles.experienceText}>Empresa: {item.company_name}</Text>
        <Text style={styles.experienceText}>Data de Início: {new Date(item.start_date).toLocaleDateString('pt-BR')}</Text>
        <Text style={styles.experienceText}>Data de Término: {new Date(item.end_date).toLocaleDateString('pt-BR')}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.removeButtonList}
        onPress={() => handleRemoveExperience(item.candidate_experience_id)}
      >
        <MaterialIcons name="delete" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
        <FlatList
          data={experiences}
          renderItem={renderExperienceItem}
          keyExtractor={item => item.candidate_experience_id}
          ListHeaderComponent={
            <View style={styles.headerContainer}>
              {/* Botão de Retorno */}
              <TouchableOpacity style={styles.backButton} onPress={handleNav}>
                <Ionicons name="arrow-back" size={24} color="black" />
              </TouchableOpacity>
              <Image
                source={logoSmall}
                style={styles.imageLogo}
                resizeMode="stretch"
              />
              <Text style={styles.title}>Editar Experiências Profissionais</Text>
            </View>
          }
          ListFooterComponent={
            <>
              {experiences.length < 5 && !selectedExperience && (
                <TouchableOpacity style={styles.addButton} onPress={handleAddExperience}>
                  <MaterialIcons name="add-circle" size={40} color="black" />
                </TouchableOpacity>
              )}

              {selectedExperience ? (
                <>
                  <View style={styles.editContainer}>
                  <Text style={styles.label}>Título *{'\n'}</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Ex.: Gerente de Projeto"
                    value={title}
                    onChangeText={setTitle}
                  />

                  <Text style={styles.label}>Nome da Empresa *{'\n'}</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Ex: Empresa XYZ"
                    value={companyName}
                    onChangeText={setCompanyName}
                  />

                  <Text style={styles.label}>Data de Início:{'\n'}</Text>
                  <Text style={styles.input} onPress={() => setShowStartDatePicker(true)}>
                    {startDate.toLocaleDateString('pt-BR')}
                  </Text>
                  {showStartDatePicker && (
                    <DateTimePicker
                      testID="dateTimePicker"
                      value={startDate}
                      mode="date"
                      is24Hour={true}
                      display="default"
                      onChange={onStartDateChange}
                    />
                  )}

                  <Text style={styles.label}>Data de Término:{'\n'}</Text>
                  <Text style={styles.input} onPress={() => setShowEndDatePicker(true)}>
                    {endDate.toLocaleDateString('pt-BR')}
                  </Text>
                  {showEndDatePicker && (
                    <DateTimePicker
                      testID="dateTimePicker"
                      value={endDate}
                      mode="date"
                      is24Hour={true}
                      display="default"
                      onChange={onEndDateChange}
                    />
                  )}
                  </View>

                  <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.cancelButton} onPress={handleResetSelection}>
                      <Text style={styles.buttonText}>Voltar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.updateButton} onPress={handleUpdateExperience}>
                      <Text style={styles.buttonText}>Adicionar</Text>
                    </TouchableOpacity>
                  </View>
                </>
              ) :
                <View style={styles.saveButtonContainer}>
                  <TouchableOpacity style={styles.saveButton} onPress={handleSubmit}>
                    <Text style={styles.saveButtonText}>Salvar Experiências</Text>
                  </TouchableOpacity>
                </View>
              }
            </>
          }
          style={styles.content}
        />
      </View>
  );
}
