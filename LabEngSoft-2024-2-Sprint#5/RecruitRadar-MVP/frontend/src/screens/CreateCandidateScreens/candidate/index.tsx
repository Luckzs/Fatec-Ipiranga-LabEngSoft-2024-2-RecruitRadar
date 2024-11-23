import { StatusBar } from 'expo-status-bar';
import {
  View,
  Text,
  Image,
  Alert,
  ActivityIndicator,
  Platform,
  TouchableOpacity
} from 'react-native';
import {
  Ionicons,
  FontAwesome5,
  MaterialIcons,
  Feather,
} from "@expo/vector-icons";
import { styles } from './styles';
import logoSmall from "../../../assets/LogoBetterSmall.png";
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import React from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import { validateCPF } from '../../../services/validateCPF';
import { theme } from '../../../global/styles/theme';
import { Button } from '../../../components/Button';
import { format } from 'path';

export function CreateCandidate() {

  interface Candidato {
    full_name: string;
    CPF: string;
    sex: string;
    pcd: boolean;
    birth_date: string;
  }


  const navigation = useNavigation<any>();
  const today = new Date();
  const defaultBirthDate = new Date(today.getFullYear() - 16, today.getMonth(), today.getDate());
  const [birth_date, setDate] = React.useState(defaultBirthDate);
  const [show, setShow] = React.useState(false);
  const [isPCD, setIsPCD] = React.useState(false);
  const [full_name, setFullName] = React.useState(String);
  const [sex, setSex] = React.useState(String);
  const [CPF, setCPF] = React.useState(String);
  const [errorMessage, setErrorMessage] = React.useState('');


  const handleNavigate = () => {
    console.log(isPCD);
    console.log(sex);
    if (!CPF || !full_name || !sex || !birth_date) {
      Alert.alert('Atenção', 'Preencha todos os campos');
      return;
    }

    
    const error = validateCPF(CPF);
    setErrorMessage(error);

    if (error) {
      Alert.alert('Atenção', 'CPF inválido');
      console.log(errorMessage);
      return;
    }

    const formattedDate = formatDate(birth_date);

    const candidato: Candidato = {
      full_name: full_name,
      CPF: CPF,
      sex: sex,
      pcd: isPCD,
      birth_date: formattedDate
    }
    console.log(candidato);

    navigation.navigate('Address', {
      candidato: JSON.stringify(candidato)
    });
  }

  const onChange = (event: any, selectedDate?: Date) => {
    const currentDate = selectedDate || birth_date;
    setShow(false);
    setDate(currentDate);
  };

  const formatDate = (date: Date): string => {
    const month = String(date.getMonth() + 1).padStart(2, '0'); // getMonth() retorna 0 para janeiro, por isso adicione 1
    const day = String(date.getDate()).padStart(2, '0');
    const year = date.getFullYear();
    return `${month}-${day}-${year}`;
  };

  // Validate CPF in real-time as the user types
  const handleCPFChange = (input: string) => {
    setCPF(input);
    
    const error = validateCPF(input);
    setErrorMessage(error!='' ? error : '');
  };

  const toggleCheckbox = () => {
    setIsPCD(!isPCD);
    console.log(!isPCD);
  };

  const isSameDate = (date1: Date, date2: Date) => {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  };

  return (
    <ScrollView style={styles.scrollview}>
      
    <View style={styles.container}>
      <Image
        source={logoSmall}
        style={styles.imageLogo}
        resizeMode="stretch"
      />

      <View style={styles.content}>

      <View style={styles.text1ContainerForgot}>
        <Text style={styles.text1Forgot}>
        Perfil de Candidato
        </Text>
      </View>

      <Text style={styles.label}>Nome Completo</Text>
        <TextInput style={styles.input} placeholder="Insira seu nome completo"
          keyboardType='default'
          placeholderTextColor={'#737380C2'}
          maxLength={40}
          onChangeText={(text) => setFullName(text)}
        >
        </TextInput>

        <Text style={styles.label}>Sexo</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={sex}
            style={styles.picker}
            onValueChange={(itemValue, itemIndex) => setSex(itemValue)}
          >
            <Picker.Item label="Selecione seu sexo" value="" color='#737380C2'/>
            <Picker.Item label="Masculino" value="Masculino" color='black'/>
            <Picker.Item label="Feminino" value="Feminino"  color = 'black'/>
          </Picker>
        </View>

        <Text style={styles.label}>CPF</Text>
        <TextInput style={styles.input} keyboardType='numeric'
          placeholder="Insira seu CPF"
          maxLength={12}
          value={CPF}
          placeholderTextColor={'#737380C2'}
          onChangeText={handleCPFChange}
        >
        </TextInput>{errorMessage !== '' && <Text style={styles.errorText}>{errorMessage}</Text>}


        <Text style={styles.label}>Data de Nascimento</Text>
        <View style = {styles.dateinputContainer}>
        <Text style={isSameDate(birth_date, defaultBirthDate) ? styles.placeholderdateinput : styles.dateinput} onPress={() => setShow(true)}>
          {isSameDate(birth_date, defaultBirthDate)  ? 'Insira sua data de nascimento' : birth_date.toLocaleDateString('pt-BR')  }
        </Text>
        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={birth_date}
            mode="date"
            display="default"
            is24Hour={true}
            onChange={onChange}
            maximumDate={defaultBirthDate}
          />
        )
        }
        <Ionicons
          name={"calendar"}
          size={24}
          color={"#737380C2"}
        />
        </View>

        <Text style={styles.label}>
          PCD  {'\n'}
        </Text>
        <TouchableOpacity style={styles.checkboxContainer} onPress={toggleCheckbox}>
          <View style={styles.checkbox}>
            {isPCD && <View style={styles.checked} />}
          </View>
          <Text style={styles.checkboxLabel}>{isPCD ? "Sim" : "Não"}</Text>
        </TouchableOpacity>

        <View style={styles.containerButtonPrimary}>
          <TouchableOpacity style={styles.buttonPrimary} onPress={handleNavigate}>
            <Text style={styles.textbuttonPrimary}>Continuar</Text>
          </TouchableOpacity>
        </View>

      </View>
    </View>
    </ScrollView>
  );
}