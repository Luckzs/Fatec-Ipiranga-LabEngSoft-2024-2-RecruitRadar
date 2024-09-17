import {
  View,
  Text,
  Image,
  Alert,
  ScrollView, 
  TouchableOpacity
} from 'react-native';
import { styles } from './styles';
import logoSmall from "../../../assets/LogoSmall.png";
import { TextInput } from 'react-native-gesture-handler';
import { useNavigation } from "@react-navigation/native";
import React from 'react';
import api from '../../../services/api';
import useAsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';

interface Language {
  email: string;
  course_name: string;
  level: string;
}

interface Skill {
  email: string;
  text: string;
}

export function CandidateSkillLanguage() {
  const [Skills, setSkills] = React.useState<Skill[]>([]);
  const [Languages, setLanguages] = React.useState<Language[]>([]);
  const [email, setEmail] = React.useState('');
  const [course_name, setCourseName] = React.useState('');
  const [level, setLevel] = React.useState('');
  const [text, setText] = React.useState('');
  const [isSkillListVisible, setIsSkillListVisible] = React.useState(true);
  const [isLanguageListVisible, setIsLanguageListVisible] = React.useState(true);

  const navigation = useNavigation<any>();

  const handleAddSkill = async () => {
    if (Skills.length >= 5) {
      Alert.alert('Erro', 'Você atingiu o limite de habilidades.');
      return;
    }

    if (!text) {
      Alert.alert('Erro', 'Todos os campos são obrigatórios.');
      return;
    }

    const email = await useAsyncStorage.getItem('@RRAuth:user')
      .then(response => JSON.parse(response || '{}').email);

    const newSkill: Skill = {
      email,
      text,
    };

    setSkills([...Skills, newSkill]);
    setText('');
  };

  const handleAddLanguage = async () => {
    if (Languages.length >= 5) {
      Alert.alert('Erro', 'Você atingiu o limite de idiomas.');
      return;
    }

    if (!course_name || !level) {
      Alert.alert('Erro', 'Todos os campos são obrigatórios.');
      return;
    }

    const email = await useAsyncStorage.getItem('@RRAuth:user')
      .then(response => JSON.parse(response || '{}').email);

    const newLanguage: Language = {
      email,
      course_name,
      level,
    };

    setLanguages([...Languages, newLanguage]);
    setCourseName('');
    setLevel('');
  };

  const handleRemoveSkill = (index: number) => {
    Alert.alert('Confirmação', 'Tem certeza que deseja remover esta habilidade?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Remover',
        onPress: () => {
          const updatedSkills = Skills.filter((_, i) => i !== index);
          setSkills(updatedSkills);
        },
        style: 'destructive',
      },
    ]);
  };

  const handleRemoveLanguage = (index: number) => {
    Alert.alert('Confirmação', 'Tem certeza que deseja remover este idioma?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Remover',
        onPress: () => {
          const updatedLanguages = Languages.filter((_, i) => i !== index);
          setLanguages(updatedLanguages);
        },
        style: 'destructive',
      },
    ]);
  };

  const toggleSkillListVisibility = () => {
    setIsSkillListVisible(!isSkillListVisible);
  };

  const toggleLanguageListVisibility = () => {
    setIsLanguageListVisible(!isLanguageListVisible);
  };

  const handleSubmit = async () => {
    if (Skills.length === 0) {
      Alert.alert('Erro', 'Adicione pelo menos uma habilidade.');
      return;
    }

    if (Languages.length === 0) {
      Alert.alert('Erro', 'Adicione pelo menos um idioma.');
      return;
    }

    try {
      await Promise.all([
        api.post('/candidate/language', { Languages }),
        api.post('/candidate/skill', { Skills }),
      ]);
      Alert.alert('Sucesso', 'Informações salvas com sucesso!');
      navigation.navigate('CandidateObjectives');
    } catch (error) {
      Alert.alert('Erro', 'Erro ao salvar as informações: ' + error.message);
    }
  };
  const isSaveButtonVisible = Skills.length > 0 && Languages.length > 0;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Image source={logoSmall} style={styles.imageLogo} resizeMode="stretch" />
        <Text style={styles.title}>Adicionar Competências e Idiomas</Text>

        {/* Habilidades */}
        <TextInput
          style={styles.input}
          placeholder="Habilidade *"
          value={text}
          onChangeText={setText}
        />
        {Skills.length < 5 && (
          <TouchableOpacity style={styles.addButton} onPress={handleAddSkill}>
            <Text style={styles.addButtonText}>+</Text>
          </TouchableOpacity>
        )}

        {/* Lista de Habilidades */}
        <TouchableOpacity onPress={toggleSkillListVisibility}>
          <Text style={styles.subtitle}>Habilidades Adicionadas</Text>
        </TouchableOpacity>
        {isSkillListVisible && Skills.length > 0 && (
          <View style={styles.studyList}>
            {Skills.map((skill, index) => (
              <View key={index} style={styles.studyItem}>
                <Text style={styles.studyText}>Habilidade: {skill.text}</Text>
                <TouchableOpacity onPress={() => handleRemoveSkill(index)}>
                  <Text style={styles.removeButton}>Remover</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}

        {/* Idiomas */}
        <TextInput
          style={styles.input}
          placeholder="Idioma *"
          value={course_name}
          onChangeText={setCourseName}
        />

<View style={styles.pickerContainer}>
  <Picker
    selectedValue={level}
    style={styles.picker}
    onValueChange={(itemValue) => setLevel(itemValue)}
  >
    <Picker.Item label="Selecione o Nível" value="" />
    <Picker.Item label="Básico" value="Básico" />
    <Picker.Item label="Intermediário" value="Intermediário" />
    <Picker.Item label="Avançado" value="Avançado" />
    <Picker.Item label="Fluente" value="Fluente" />
  </Picker>
</View>


        {Languages.length < 5 && (
          <TouchableOpacity style={styles.addButton} onPress={handleAddLanguage}>
            <Text style={styles.addButtonText}>+</Text>
          </TouchableOpacity>
        )}

        {/* Lista de Idiomas */}
        <TouchableOpacity onPress={toggleLanguageListVisibility}>
          <Text style={styles.subtitle}>Idiomas Adicionados</Text>
        </TouchableOpacity>
        {isLanguageListVisible && Languages.length > 0 && (
          <View style={styles.studyList}>
            {Languages.map((language, index) => (
              <View key={index} style={styles.studyItem}>
                <Text style={styles.studyText}>Idioma: {language.course_name}</Text>
                <Text style={styles.studyText}>Nível: {language.level}</Text>
                <TouchableOpacity onPress={() => handleRemoveLanguage(index)}>
                  <Text style={styles.removeButton}>Remover</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}

        {/* Exibir o botão de salvar apenas se as condições forem satisfeitas */}
        {isSaveButtonVisible && (
          <TouchableOpacity style={styles.buttonPrimary} onPress={handleSubmit}>
            <Text style={styles.textbuttonPrimary}>Salvar Informações</Text>
          </TouchableOpacity>
        )}

      </View>
    </ScrollView>
  );
}
