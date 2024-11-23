import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Alert, Image, Text, TouchableOpacity, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import logoSmall from "../../../assets/LogoSmall.png";
import { Button } from "../../../components/Button";
import { TransparentButton } from "../../../components/TransparentButton";
import { theme } from "../../../global/styles/theme";
import { styles } from "./styles";
import { useAuth } from "../../../contexts/auth";
import {
  Ionicons,
  FontAwesome5,
  MaterialIcons,
  Feather,
} from "@expo/vector-icons";

export function SignIn() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const { signIn } = useAuth();
  const [isMatchPasswordVisible, setIsMatchPasswordVisible] =
    React.useState(true);

  const toggleMatchPasswordVisibility = () => {
    setIsMatchPasswordVisible(!isMatchPasswordVisible);
  };

  function handleLogin() {
    if (email === "" || password === "") {
      Alert.alert("Atenção", "Preencha todos os campos");

      return;
    }
    signIn(email, password)
      .then(() => {
        console.log("Login realizado com sucesso");
      })
      .catch((error) => {
        Alert.alert("Atenção", error.message);
        console.error("1Erro no login:", error.message);
      });
  }

  const navigation = useNavigation<any>();

  const handleNavigate = () => {
    navigation.navigate("CreateUser");
    // navigation.goBack();
  };

  const handleNavigateForgotPassword = () => {
    navigation.navigate("ForgotPassword");
    // navigation.goBack();
  };
  return (
    <View style={styles.container}>
      <View style={styles.titlePrimaryContainer}>
        <Text style={styles.titlePrimary}>Recruit </Text>
        <Image source={logoSmall} style={styles.logo} resizeMode="stretch" />
        <Text style={styles.titlePrimary}> Radar</Text>
      </View>
      <View style={styles.text1Container}>
        <Text style={styles.text1}>Entrar</Text>
      </View>
      <View style={styles.text2Container}>
        <TouchableOpacity>
          <Text style={styles.text2} onPress={handleNavigate}>
            ou Cadastre-se no RecruitRadar.
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        <TextInput
          style={styles.input}
          placeholder="Insira seu e-mail"
          keyboardType="email-address"
          placeholderTextColor={theme.colors.primary}
          maxLength={50}
          onChangeText={(text) => setEmail(text)}
        ></TextInput>

        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passinput}
            keyboardType="default"
            placeholder="Insira sua senha"
            maxLength={20}
            secureTextEntry={isMatchPasswordVisible}
            onChangeText={(text) => setPassword(text)}
            placeholderTextColor={theme.colors.primary}
          ></TextInput>
          <TouchableOpacity
            onPress={toggleMatchPasswordVisibility}
            style={styles.iconContainer}
          >
            <Ionicons
              name={isMatchPasswordVisible ? "eye" : "eye-off"}
              size={24}
              color={"#0262A6"}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.forgotpasswordContainer}>
        <TouchableOpacity
          style={styles.forgotPasswordButton}
          onPress={handleNavigateForgotPassword}
        >
          <Text style={styles.forgotPasswordText}>Esqueceu a Senha?</Text>
        </TouchableOpacity>
        </View>
      </View>

      <View style={styles.controls}>
        <TouchableOpacity style={styles.buttonRegister} onPress={handleLogin}>
          <Text style={styles.textButtonRegister}>Entrar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
