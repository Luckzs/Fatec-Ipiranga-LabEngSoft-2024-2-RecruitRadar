import React, { useState } from 'react';
import {
  View,
  Text,
  Alert,
  ScrollView,
  TouchableOpacity,
  FlatList,
  TextInput,
  Image,
  ActivityIndicator,
} from 'react-native';
import { styles } from './styles';
import logoSmall from '../../../assets/LogoBetterSmall.png';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation, RouteProp, useRoute } from '@react-navigation/native';
import useAsyncStorage from '@react-native-async-storage/async-storage';
import api from '../../../services/api';
import { Ionicons } from '@expo/vector-icons';

interface SkillProfileData {
  text: string;
}

interface CandidateSkill {
  candidate_skill_id: string;
  Skill: SkillProfileData;
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
  candidateSkills: CandidateSkill[];
}

interface Skill {
  candidate_skill_id: string;
  text: string;
  isNew?: boolean;
}

type RootStackParamList = {
  EditCandidateSkill: { profileData: ProfileData };
};

type EditCandidateSkillRouteProp = RouteProp<RootStackParamList, 'EditCandidateSkill'>;

export function EditCandidateSkill() {
  const navigation = useNavigation();
  const route = useRoute<EditCandidateSkillRouteProp>();
  const { profileData } = route.params;

  const [skills, setSkills] = useState<Skill[]>(profileData.candidateSkills.map(skill => ({
    candidate_skill_id: skill.candidate_skill_id,
    text: skill.Skill.text,
    isNew: false,
  })));

  const [text, setText] = useState('');
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleAddSkill = async () => {
    if (skills.length >= 5) {
      Alert.alert('Erro', 'Você atingiu o limite de habilidades.');
      return;
    }

    const newSkill: Skill = {
      candidate_skill_id: Math.random().toString(36).substring(2) + Date.now().toString(36), // Gerar um ID único para a nova habilidade
      text: '', // Começar com um texto vazio para o novo campo
      isNew: true, // Marcar como nova
    };

    setSkills([...skills, newSkill]);
    setSelectedSkill(newSkill); // Define a nova habilidade como selecionada
    setText(''); // Limpa o texto do campo
  };

  const handleRemoveSkill = (candidate_skill_id: string) => {
    if (skills.length <= 1) {
      Alert.alert('Erro', 'Você deve ter pelo menos uma habilidade.');
      return;
    }

    const skillToRemove = skills.find(skill => skill.candidate_skill_id === candidate_skill_id);

    if (skillToRemove?.isNew) {
      const updatedSkills = skills.filter(skill => skill.candidate_skill_id !== candidate_skill_id);
      setSkills(updatedSkills);
      if (selectedSkill && candidate_skill_id === selectedSkill.candidate_skill_id) {
        setSelectedSkill(null);
        setText('');
      }
      return;
    }

    Alert.alert('Confirmação', 'Tem certeza que deseja remover esta habilidade?', [
      {
        text: 'Cancelar',
        style: 'cancel',
      },
      {
        text: 'Remover',
        onPress: async () => {
          try {

            await api.delete(`/candidate/skill/${candidate_skill_id}`);

            const updatedSkills = skills.filter(skill => skill.candidate_skill_id !== candidate_skill_id);

            setSkills(updatedSkills);

            Alert.alert('Sucesso', 'Formação excluída com sucesso!');

          } catch (error) {
            //console.error(error);
            Alert.alert('Erro', 'Erro ao excluir a formação: ' + error);
          }
        },
        style: 'destructive',
      },
    ]);

  };

  const handleEditSkill = (skill: Skill) => {
    setSelectedSkill(skill);
    setText(skill.text);
  };

  const handleUpdateSkill = () => {
    if (selectedSkill) {
      const updatedSkills = skills.map(skill =>
        skill.candidate_skill_id === selectedSkill.candidate_skill_id ? { ...skill, text } : skill
      );
      setSkills(updatedSkills);
      setSelectedSkill(null);
      setText('');
    }

  };

  const handleSubmit = async () => {
    if (skills.length === 0) {
      Alert.alert('Erro', 'Adicione pelo menos uma habilidade.');
      return;
    }

    try {
      const email = await useAsyncStorage.getItem('@RRAuth:user')
        .then(response => JSON.parse(response || '{}').email);

      console.log(skills);

      setIsLoading(true);
      await api.put(`/candidate/skill/${email}`, { skills })
      setIsLoading(false);

      Alert.alert('Sucesso', 'Informações salvas com sucesso!');
      navigation.goBack();
     

    } catch (error) {
      setIsLoading(false);
      //console.error(error);
      Alert.alert('Erro', 'Erro ao salvar as informações: ' + error);
    }finally{
      setIsLoading(false);
    }
  };

  const handleNav = () => {
    navigation.goBack();
  };

  const renderSkillItem = ({ item }: { item: Skill }) => (
    <View style={styles.skillItem}>
      <TouchableOpacity style={styles.skillContent} onPress={() => handleEditSkill(item)}>
        <Text style={styles.skillText}>{item.text}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.removeButtonList}
        onPress={() => handleRemoveSkill(item.candidate_skill_id)}
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
        data={skills}
        renderItem={renderSkillItem}
        keyExtractor={item => item.candidate_skill_id}
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
            <Text style={styles.title}>Editar Competências</Text>

          </View>
        }
        ListFooterComponent={
          <>
            {skills.length < 5 && !selectedSkill && (
              <TouchableOpacity style={styles.addButton} onPress={handleAddSkill}>
                <MaterialIcons name="add-circle" size={40} color="#0262A6" />
              </TouchableOpacity>
            )}

            {selectedSkill ? (
              <>
              <View style={styles.editContainer}>
                <Text style={styles.label}>Habilidade *{'\n'}</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Ex: Programação em React"
                  value={text}
                  onChangeText={setText}
                />
              </View>

                <View style={styles.buttonContainer}>
                  <TouchableOpacity style={styles.addbuttonPrimary} onPress={() => setSelectedSkill(null)}>
                    <Text style={styles.addtextbuttonPrimary}>Cancelar</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.addbuttonPrimary} onPress={handleUpdateSkill}>
                    <Text style={styles.addtextbuttonPrimary}>Adicionar</Text>
                  </TouchableOpacity>
                </View>
                
              </>
            ) : (
              skills.length > 0 && (
                <TouchableOpacity style={styles.saveButton1} onPress={handleSubmit}>
                  <Text style={styles.saveButtonText}>Salvar Competências</Text>
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
