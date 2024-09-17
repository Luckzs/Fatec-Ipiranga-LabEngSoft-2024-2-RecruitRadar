import { StatusBar } from 'expo-status-bar';
import {
  View,
  Text,
  Image,
  Alert,
  ActivityIndicator
} from 'react-native';
import { styles } from './styles';
import logoSmall from "../../assets/app-name-small.png";
import emailConfirmado from "../../assets/Email_Confirmado.png";
import cadastroConfirmado from "../../assets/Cadastro_Confirmado.png";
import { TextInput } from 'react-native-gesture-handler';
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { ButtonWhite } from '../../../components/ButtonWhite';

export function ConfirmUser() {
  const navigation = useNavigation<any>();

  const handleNavigate = () => {
    //navigation.navigate('SignIn');
    // navigation.goBack();
  }
  return (
      
    <View style={styles.container}>
        <Image
            source={logoSmall}
            style={styles.imageLogo}
            resizeMode="stretch"
        />

        <Image 
        source={cadastroConfirmado} 
        style={styles.image} 
        resizeMode="stretch"
        />

        <View style={styles.content}>
            <Text style={styles.title}>
            Seu Perfil foi criado {'\n'}
            com sucesso!{'\n'}
            </Text>

            <Text style={styles.label}>
            Realize o login com as credenciais inseridas anteriormente{'\n'}
            </Text>
            
            <View style={styles.controlsbutons}>
                <ButtonWhite
                title="Entrar" onPress={handleNavigate}
                />
            </View>
        </View>
    </View>
    );
}