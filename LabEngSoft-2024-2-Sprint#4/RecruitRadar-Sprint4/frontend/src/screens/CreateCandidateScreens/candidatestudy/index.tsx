import useAsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
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
  const [EduInst, setEduInst] = React.useState('');
  const [level, setLevel] = React.useState('');
  const [course, setCourse] = React.useState('');
  const [situation, setSituation] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [startDate, setStartDate] = React.useState(new Date());
  const [endDate, setEndDate] = React.useState(new Date());
  const [showStartDatePicker, setShowStartDatePicker] = React.useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = React.useState(false);
  const [isStudyListVisible, setIsStudyListVisible] = React.useState(true);

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

  const handleAddStudy = async () => {
    if (!level || !EduInst) {
      Alert.alert('Erro', 'Todos os campos são obrigatórios.');
      return;
    }

    const userEmail = await useAsyncStorage.getItem('@RRAuth:user')
      .then(response => JSON.parse(response || '{}').email);

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
    setEduInst('');
    setLevel('');
    setCourse('');
    setSituation('');
    setStartDate(new Date());
    setEndDate(new Date());
  };

  const handleRemoveStudy = (index: number) => {
    Alert.alert('Confirmação', 'Tem certeza que deseja remover esta qualificação?', [
      {
        text: 'Cancelar',
        style: 'cancel',
      },
      {
        text: 'Remover',
        onPress: () => {
          const updatedQualifications = qualifications.filter((_, i) => i !== index);
          setQualifications(updatedQualifications);
        },
        style: 'destructive',
      },
    ]);
  };

  const toggleStudyListVisibility = () => {
    setIsStudyListVisible(!isStudyListVisible);
  };

  const handleSubmit = () => {
    if (qualifications.length === 0) {
      Alert.alert('Erro', 'Adicione pelo menos uma qualificação.');
      return;
    }

    api.post('/candidate/study', { qualifications })
      .then(() => {
        setQualifications([]);
        Alert.alert('Sucesso', 'Qualificações salvas com sucesso!');
        navigation.navigate('CandidateSkillLanguage');
      })
      .catch(error => {
        Alert.alert('Erro', 'Erro ao salvar as qualificações: ' + error.message);
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

        <Text style={styles.title}>Adicionar Formações Acadêmicas</Text>

        <TextInput
          style={styles.input}
          placeholder="Instituição *"
          value={EduInst}
          onChangeText={setEduInst}
        />

        <TextInput
          style={styles.input}
          placeholder="Tipo de Diploma *"
          value={level}
          onChangeText={setLevel}
        />

        <TextInput
          style={styles.input}
          placeholder="Área de Estudo / Nome do Curso *"
          value={course}
          onChangeText={setCourse}
        />

        <View style={styles.pickerContainer}>
        <Picker
          selectedValue={situation}
          style={styles.input}
          onValueChange={setSituation}
        >
          <Picker.Item label="Situação *" value="" />
          <Picker.Item label="Cursando" value="Cursando" />
          <Picker.Item label="Finalizado" value="Finalizado" />
          <Picker.Item label="Incompleto" value="Incompleto" />
        </Picker>
        </View>

        <Text style={styles.input} onPress={() => setShowStartDatePicker(true)}>
          Data de Início: {startDate.toLocaleDateString('pt-BR')}
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
          Data de Término: {endDate.toLocaleDateString('pt-BR')}
        </Text>
        {showEndDatePicker && (
          <DateTimePicker
            value={endDate}
            mode="date"
            display="default"
            onChange={onEndDateChange}
          />
        )}

        <TouchableOpacity style={styles.addButton} onPress={handleAddStudy}>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={toggleStudyListVisibility}>
          <Text style={styles.subtitle}>Qualificações Adicionadas</Text>
        </TouchableOpacity>

        {isStudyListVisible && qualifications.length > 0 && (
          <View style={styles.studyList}>
            {qualifications.map((study, index) => (
              <View key={index} style={styles.studyItem}>
                <Text style={styles.studyText}>Curso: {study.course}</Text>
                <Text style={styles.studyText}>Diploma: {study.level}</Text>
                <Text style={styles.studyText}>
                  Início: {new Date(study.startDate).toLocaleDateString('pt-BR')}
                </Text>
                <Text style={styles.studyText}>
                  Término: {new Date(study.endDate).toLocaleDateString('pt-BR')}
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
