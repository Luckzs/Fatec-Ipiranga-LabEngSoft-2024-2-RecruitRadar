import { StatusBar } from "expo-status-bar";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { styles } from "./styles";
import logoSmall from "../../../assets/LogoSmall.png";


import { useNavigation, useFocusEffect } from "@react-navigation/native";


export function Start() {
  const navigation = useNavigation<any>();

  const handleNavigate = () => {
    navigation.navigate('SignIn');
    // navigation.goBack();
  }

  return (
    <View style={styles.body}>
      <View style={styles.titlePrimaryContainer}>
        <Text style={styles.titlePrimary}>Recruit </Text>
        <Image
          source={logoSmall}
          style={styles.logo}
          resizeMode="stretch"
        />
        <Text style={styles.titlePrimary}> Radar</Text>
      </View>
      <View style={styles.sloganContainer}>
        <Text style={styles.slogan}>
          Unindo Vagas e Talentos:{"\n"}
          O Tinder do Match Profissional.
        </Text>
      </View>
      <View style={styles.sliderIndicators}>
        <View style={[styles.dot, styles.dotActive]} />
        <View style={styles.dot} />
        <View style={styles.dot} />
        <View style={styles.dot} />
      </View>

      <Text style={styles.terms}>
        Ao clicar em Entrar, você aceita o
        <Text style={styles.link}> Contrato do Usuário</Text>, a
        <Text style={styles.link}> Política de Privacidade</Text> e a
        <Text style={styles.link}> Política de Cookies</Text> do RecruitRadar.
      </Text>

      <View style={styles.containerButtonPrimary}>
        <TouchableOpacity style={styles.buttonPrimary} onPress={handleNavigate}>
          <Text style={styles.textbuttonPrimary}>Entrar</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
}
