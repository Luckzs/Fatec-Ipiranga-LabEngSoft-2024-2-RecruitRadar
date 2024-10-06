import { StatusBar } from "expo-status-bar";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { styles } from "./styles";
import logoSmall from "../../../assets/LogoSmall.png";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { useEffect, useState } from "react";

const phrases = [
  "Conectando Talentos: O Tinder das Vagas!",
  "Unindo Vagas e Talentos: O Tinder do Match Profissional.",
  "Conectando você com as melhores vagas: seu Tinder para matches de carreira"
];

export function Start() {
  const navigation = useNavigation<any>();
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPhraseIndex((prevIndex) => (prevIndex + 1) % phrases.length);
    }, 3000); // Troca de frase a cada 3 segundos
    return () => clearInterval(interval);
  }, []);


  const handleNavigate = () => {
    //console.log('Entrar');
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
          {phrases[currentPhraseIndex]}
        </Text>
      </View>

      <View style={styles.sliderIndicators}>
        {phrases.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              currentPhraseIndex === index ? styles.dotActive : null
            ]}
          />
        ))}
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
