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

export function SignIn() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const { signIn } = useAuth();

  function handleLogin() {
    if (email === "" || password === "") {
      Alert.alert("Atenção", "Preencha todos os campos");

      return;
    }
    signIn(email, password)
      .then(() => {
        console.log("Login realizado com sucesso");

        Alert.alert("Atenção", "Login realizado com sucesso");
      })
      .catch((error) => {
        Alert.alert("Atenção", "Erro ao realizar login");
        console.log("Erro no login:", error);
        console.error("Erro no login:", error);
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

        <TextInput
          style={styles.input}
          keyboardType="default"
          placeholder="Insira sua senha"
          maxLength={20}
          secureTextEntry={true}
          onChangeText={(text) => setPassword(text)}
          placeholderTextColor={theme.colors.primary}
        ></TextInput>
        <View style={styles.controls}>
          <TouchableOpacity
            style={styles.forgotPasswordButton}
            onPress={handleNavigateForgotPassword}
          >
            <Text style={styles.forgotPasswordText}>Esqueceu a Senha?</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.buttonRegister} onPress={handleLogin}>
          <Text style={styles.textButtonRegister}>Entrar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
