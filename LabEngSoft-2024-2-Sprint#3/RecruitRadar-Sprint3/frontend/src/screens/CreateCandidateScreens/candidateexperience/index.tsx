import useAsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { useNavigation } from "@react-navigation/native";
import React from 'react';
import {
  Alert,
  Image,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { Button } from "../../../components/Button";
import api from '../../../services/api';
import logoSmall from "../../../assets/LogoSmall.png";
import { styles } from './styles';

interface Experience{
  email: string;
  title:string;
  company_name:string;
  startDate:string;
  endDate:string;
}

interface User {
  //name: string;
  email: string;
}


export function CandidateExperience() {
  const [experiences, setExperiences] = React.useState<Experience[]>([]);
  const [title, setTitle] = React.useState('');
  const [company_name, setCompanyName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [startDate, setStartDate] = React.useState(new Date());
  const [endDate, setEndDate] = React.useState(new Date());
  const [showStartDatePicker, setShowStartDatePicker] = React.useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = React.useState(false);
  const [isExperienceListVisible, setIsExperienceListVisible] = React.useState(true); // Novo estado

	
  const navigation = useNavigation<any>();

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

  const handleAddExperience = async () => {
    if (!company_name || !title ){
      Alert.alert('Erro', 'Todos os campos são obrigatórios.');
      return;
    }

    const email = await useAsyncStorage.getItem('@RRAuth:user')
      .then(response => {
        return JSON.parse(response || '{}').email;
      }
    );

    

    const newExperience: Experience = {
      email,
      title,
      company_name,
      startDate: startDate.toISOString(),
      endDate : endDate.toISOString() 
    };
    setExperiences([...experiences, newExperience]);

    // Limpa os campos após adicionar uma experiência
    setCompanyName('');
    setTitle('');
    setStartDate(new Date());
    setEndDate(new Date());
    setEmail('');
  };

  const handleRemoveExperience = (index: number) => {
    Alert.alert('Confirmação', 'Tem certeza que deseja remover esta experiência?', [
      {
        text: 'Cancelar',
        style: 'cancel',
      },
      {
        text: 'Remover',
        onPress: () => {
          const updatedExperiences = experiences.filter((_, expIndex) => expIndex !== index);
          setExperiences(updatedExperiences);
        },
        style: 'destructive',
      },
    ]);
  };

  const toggleExperienceListVisibility = () => {
    setIsExperienceListVisible((prevState) => !prevState);
  };

  const handleSubmit = () => {
    if (experiences.length === 0) {
      Alert.alert('Erro', 'Adicione pelo menos uma experiência profissional.');
      return;
    }

    console.log(experiences);

    // Envia as informações para a API
    api.post('/candidate/experience', { experiences })
      .then(response => {
        setExperiences([]); // Limpa a lista de experiências
        Alert.alert('Sucesso', 'Experiências salvas com sucesso!');
        console.log(response);  
        navigation.navigate('CandidateStudy'); 
      })
      .catch(error => {
        console.error(error);
        Alert.alert('Erro', 'Erro ao salvar experiências: ' + error.message);
      });


  };

  return (
    <ScrollView style={styles.container}>
    <View style={styles.content}>
        <Image
            source={logoSmall}
            style={styles.imageLogo}
            resizeMode="stretch"
        />

        <Text style={styles.title}>
        Adicionar Experiência
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Titulo *"
          value={title}
          onChangeText={setTitle}
        />

        <TextInput
          style={styles.input}
          placeholder="Nome da Empresa *"
          value={company_name}
          onChangeText={setCompanyName}
        />

          <Text style={styles.input} onPress={() => setShowStartDatePicker(true)}>
          Data de Inicio* :{'\n'}{startDate.toLocaleDateString('pt-BR')}  {'\n'}
        </Text>
          {showStartDatePicker && (
            <DateTimePicker
              value={startDate}
              mode="date"
              display="default"
              onChange={onStartDateChange}
            />
          )}

        <Text style={styles.input} onPress={() => setShowEndDatePicker(true)}>
          Data de Termino* :{'\n'}{endDate.toLocaleDateString('pt-BR')}  {'\n'}
        </Text>
        {showEndDatePicker && (
          <DateTimePicker
            value={endDate}
            mode="date"
            display="default"
            onChange={onEndDateChange}
          />
        )}

        <TouchableOpacity style={styles.addButton} onPress={handleAddExperience}>
                        <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={toggleExperienceListVisibility}>
          <Text style={styles.subtitle}>Experiências Adicionadas:</Text>
        </TouchableOpacity>

        {isExperienceListVisible && experiences.length > 0 && (
          <View style={styles.experienceList}>
          
          {experiences.map((exp, index) => (
            <View key={index} style={styles.experienceItem}>
              <Text style={styles.experienceText}>Empresa: {exp.company_name}</Text>
              <Text style={styles.experienceText}>Título: {exp.title}</Text>
              <Text style={styles.experienceText}>Data de Inicio: {new Date(exp.startDate).toLocaleDateString('pt-BR')}</Text>
              <Text style={styles.experienceText}>Data de Termino: {new Date(exp.endDate).toLocaleDateString('pt-BR')}</Text>
              <TouchableOpacity onPress={() => handleRemoveExperience(index)}>
                <Text style={styles.removeButton}>Remover</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
        )}

        <TouchableOpacity style={styles.buttonPrimary} onPress={handleSubmit}>
          <Text style={styles.textbuttonPrimary}>Salvar Experiências</Text>
        </TouchableOpacity>

    </View>
    </ScrollView>
    );
}