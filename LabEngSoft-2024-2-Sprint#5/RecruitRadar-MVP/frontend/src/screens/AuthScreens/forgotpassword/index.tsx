import { StatusBar } from 'expo-status-bar';
import {
  View,
  Text,
  Image,
  Alert,
  ActivityIndicator,
  Touchable,
  TouchableOpacity
} from 'react-native';
import { styles } from './styles';
import { theme } from '../../../global/styles/theme';

import logoSmall from "../../../assets/LogoBetterSmall.png";
import { Button } from "../../../components/Button";
import { TextInput } from 'react-native-gesture-handler';
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { ButtonWhite } from '../../../components/ButtonWhite';
import React from 'react';
import api from '../../../services/api';


export function ForgotPassword() {
  const navigation = useNavigation<any>();
  const [email, setEmail] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false); // Ações específicas como login

  async function handleForgetPassword() {

    console.log('Email:', email);
    if (email === '') {
      Alert.alert('Atenção', 'Preencha todos os campos');
      console.log('Preencha todos os campos');
      return;
    }

    setIsLoading(true);
    await api.post('/forgot_password', {
      email: email
    }).then((response) => {
      console.log('Email enviado com sucesso');
      setIsLoading(false);
      Alert.alert('Atenção', 'Enviamos as instruções em seu e-mail para restaurar a sua senha. Verifique sua caixa de entrada.Caso não encontre, verifique o Lixo Eletrônico.');
      setEmail('');
      return response;
    }
    ).catch((error) => {
      console.log('Erro ao enviar email:', error);
      setIsLoading(false);
      Alert.alert('Atenção', 'Erro ao enviar email: ' + error.response.data.error);
      return error;
    }
    ).finally(() => {
      setIsLoading(false);
    });
  }

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

      <View style={styles.titlePrimaryContainer}>
        <Text style={styles.titlePrimary}>Recruit </Text>
        <Image
          source={logoSmall}
          style={styles.logo}
          resizeMode="stretch"
        />
        <Text style={styles.titlePrimary}> Radar</Text>
      </View>

      <View style={styles.text1ContainerForgot}>
        <Text style={styles.text1Forgot}>
          Esqueceu
        </Text>
      </View>
      <View style={styles.text2ContainerForgot}>
        <Text style={styles.text2Forgot}>
          a senha?
        </Text>
      </View>

      <TextInput style={styles.input} placeholder="Insira seu e-mail"
        keyboardType='email-address'
        placeholderTextColor={theme.colors.primary}
        maxLength={50}
        onChangeText={setEmail}
      >
      </TextInput>

      <View style={styles.containerNotification}>
        <Text style={styles.textNotification}>
          Enviaremos um código de verificação para este e-mail se corresponder a uma conta do RecruitRadar.
        </Text>
      </View>

      <TouchableOpacity style={styles.buttonSend} onPress={handleForgetPassword}>
        <Text
          style={styles.textButtonSend}
        >Recuperar Senha
        </Text>
      </TouchableOpacity>
    </View>
  );
}