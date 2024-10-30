import {
  View,
  Text,
  Image,
  Alert,
  TouchableOpacity
} from 'react-native';
import { styles } from './styles';
import logoSmall from "../../../assets/LogoSmall.png";
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { useNavigation, useRoute } from "@react-navigation/native";
import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from '../../../contexts/auth';
import getLocationInfo from '../../../services/location';
import api from '../../../services/api';
import { theme } from '../../../global/styles/theme';
import { Button } from '../../../components/Button';

export function Address() {

  interface Candidato {
    full_name: string;
    CPF: string;
    sex: string;
    pcd: boolean;
    birth_date: string;
  }

  interface LocationInfo {
    address: string;
    city: string;
    state: string;
    postal_code: string;
  }

  const [CEP, setCEP] = React.useState(String);
  const [endereco, setEndereco] = React.useState(String);
  const [city, setCity] = React.useState(String);
  const [state, setState] = React.useState(String);
  const [postal_code, setPostalCode] = React.useState(String);
  const [isAddressValid, setIsAddressValid] = React.useState(false); // Novo estado para controlar a visibilidade do botão
  const { user } = useAuth();

  const navigation = useNavigation<any>();

  const route = useRoute();
  const { candidato } = route.params as { candidato: string };

  // Converte a string JSON de volta em um objeto
  const parsedUser: Candidato = JSON.parse(candidato);

  const onChangeCEP = async () => {
    const cep = CEP.replace(/\D/g, '');
    if (cep.length !== 8) {
      Alert.alert('Erro', 'Por favor, insira um CEP válido com 8 dígitos.');
      return;
    }
    try {
      const locInfo: LocationInfo = await getLocationInfo(cep);
      if (!locInfo || !locInfo.address) {
        Alert.alert('Erro', 'CEP não encontrado. Por favor, insira um CEP válido.');
        return;
      }
      setEndereco(locInfo.address);
      setCity(locInfo.city);
      setState(locInfo.state);
      setPostalCode(locInfo.postal_code);
      setIsAddressValid(true); // Define o endereço como válido
    } catch (error) {
      Alert.alert('Erro', 'Não foi possivel realizar a pesquisa de endereço, por favor insira manualmente as informações');
      console.log(error);
      setIsAddressValid(true); // Define o endereço como inválido
      setEndereco(''); // Permite edição manual
      setCity(''); // Permite edição manual
      setState(''); // Permite edição manual
      setPostalCode(cep); // Define o CEP como o código postal
    }

  }
  const handleNavigate = async () => {

    console.log(parsedUser);
    console.log(endereco);
    console.log(city);
    console.log(state);
    console.log(postal_code)
    console.log(user?.email);

    api.post('/candidate', {
      full_name: parsedUser.full_name,
      CPF: parsedUser.CPF,
      sex: parsedUser.sex,
      pcd: parsedUser.pcd,
      birth_date: parsedUser.birth_date,
      address: endereco,
      city: city,
      state: state,
      postal_code: postal_code,
      distance_radius: 10,
      user_id: user?.email
    }).then((response) => {
      console.log(response);
      Alert.alert('Sucesso', 'Candidato criado com sucesso');
      navigation.navigate('CandidateExperience');
      AsyncStorage.removeItem('@RRAuth:firstTime');
    }
    ).catch((error) => {
      console.log(error.response.data);
      Alert.alert('Erro', 'Erro ao criar candidato: ' + error.response.data.error);
    });
  }
  return (
    <ScrollView>
    <View style={styles.container}>
      <Image
        source={logoSmall}
        style={styles.imageLogo}
        resizeMode="stretch"
      />

      <View style={styles.content}>
        <View style={styles.text1ContainerForgot}>
          <Text style={styles.text1Forgot}>
            Informe o seu endereço
          </Text>
        </View>


        <Text style={styles.label}>
          CEP {'\n'}
        </Text>
        <TextInput style={styles.input} placeholder="Insira o seu CEP"
          keyboardType='numeric'
          placeholderTextColor={theme.colors.primary}
          maxLength={8}
          onChangeText={text => {
            setCEP(text);
            if (text.length < 8) {
              setIsAddressValid(false);
              setCity('');
              setState('');
              setEndereco('');
              setPostalCode('');
            }
          }
          }

          onBlur={onChangeCEP}
        >
        </TextInput>

        <Text style={styles.label}>
          Endereço {'\n'}
        </Text>
        <TextInput style={styles.input} placeholder="Confira se o seu endereço esta correto"
          keyboardType='email-address'
          value={endereco}
          onChangeText={setEndereco}
          multiline={true}
          placeholderTextColor={theme.colors.primary}
        >
        </TextInput>

        <Text style={styles.label}>
          Cidade {'\n'}
        </Text>
        <TextInput style={styles.input} placeholder="Confira se a sua cidade esta correta"
          keyboardType='email-address'
          value={city}
          onChangeText={setCity}
          multiline={true}
          placeholderTextColor={theme.colors.primary}
        >
        </TextInput>

        <Text style={styles.label}>
          Estado (sigla){'\n'}
        </Text>
        <TextInput style={styles.input} placeholder="Confira se o seu estado esta correto"
          keyboardType='email-address'
          value={state}
          onChangeText={setState}
          maxLength={2}
          multiline={true}
          placeholderTextColor={theme.colors.primary}
        >
        </TextInput>

        {isAddressValid && (
        <View style={styles.containerButtonPrimary}>
        <TouchableOpacity style={styles.buttonPrimary} onPress={handleNavigate}>
          <Text style={styles.textbuttonPrimary}>Continuar</Text>
        </TouchableOpacity>
        </View>
      )}
      </View>

    </View>
    </ScrollView>

  );
}