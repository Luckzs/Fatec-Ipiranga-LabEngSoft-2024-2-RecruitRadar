import {
  View,
  Text,
  Image,
  Alert,
  TouchableOpacity
} from 'react-native';
import { styles } from './styles';
import IllustrationImg from '../../assets/Ilustration.png';
import { Ionicons } from '@expo/vector-icons';
import { ButtonWhite } from '../../components/ButtonWhite';
import { Background } from '../../components/Background';
import { useAuth } from '../../contexts/auth';
import { Button } from '../../components/Button';
import { useNavigation } from "@react-navigation/native";
import React from 'react';


export function Home() {

  
  const navigation = useNavigation<any>();

  const { user, signOut } = useAuth();

  const goToProfile = () => {
    navigation.navigate('profileScreen'); // Substitua 'ProfileScreen' pelo nome da sua tela de perfil
  };

  function handleSignOut() {
    Alert.alert('Atenção', 'Você será redirecionado para a tela de login');
    signOut();
  }

  function handleObjCand(){
    Alert.alert('Atenção', 'Você será redirecionado para a tela de informações do candidato');
    navigation.navigate('CandidateObjectives');
  }

  function handleInfoCand() {
    Alert.alert('Atenção', 'Você será redirecionado para a tela de informações do candidato');
    navigation.navigate('CandidateExperience');
  }

  function handleStudy() {
    Alert.alert('Atenção', 'Você será redirecionado para a tela de informações do candidato');
    navigation.navigate('CandidateStudy');
  }

  function handleSkill() {
    Alert.alert('Atenção', 'Você será redirecionado para a tela de informações do candidato');
    navigation.navigate('CandidateSkillLanguage');
  }


  return (
    <Background>
      <View style={styles.container}>

        <Image
          source={require('../../assets/LogoSmall.png')}
          style={styles.imageLogo}
          resizeMode="stretch"
        />

        <TouchableOpacity onPress={goToProfile} style={styles.profileIcon}>
        <Ionicons name='person' size={30} color="#fff" /> 
        </TouchableOpacity>
        
        <Text style={styles.title}>
          Login Realizado  {'\n'}
          Bem Vindo {user?.email}
        </Text>



        <Image
          source={IllustrationImg}
          style={styles.image}
          resizeMode="stretch"
        />
      
        <View style={styles.content}>

        <Text style={styles.subtitle}>
            Agora você poderá achar {'\n'} As melhores vagas para você {'\n'}
          </Text>

          <Button
            title="Preferencias Candidato"
            onPress={handleObjCand}
          />

          <Button
            title="Competências Candidato"
            onPress={handleSkill}
          />

          <Button
            title="Experiencias Candidato"
            onPress={handleInfoCand}
          />

          <Button
            title="Estudo Candidato"
            onPress={handleStudy}
          />

          <ButtonWhite
            title="SignOut"
            onPress={handleSignOut}

          />

          <Button
            title="Vagas"
            onPress={() => navigation.navigate('jobs')}
          />

        </View>
      </View>
    </Background>
  );
}