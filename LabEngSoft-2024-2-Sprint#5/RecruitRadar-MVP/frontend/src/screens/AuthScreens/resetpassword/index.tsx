import { StatusBar } from "expo-status-bar";
import { View, Text, Image, Alert, TextInput, TouchableOpacity, Keyboard, KeyboardAvoidingView, Platform, ActivityIndicator } from "react-native";
import { styles } from "./styles";
import { theme } from "../../../global/styles/theme";
import logoSmall from "../../../assets/LogoBetterSmall.png";
import emailConfirmado from "../../../assets/Email_Confirmado.png";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import api from "../../../services/api";
import {
  Ionicons,
  FontAwesome5,
  MaterialIcons,
  Feather,
} from "@expo/vector-icons";


export function ResetPassword({ route }: any) {
  const navigation = useNavigation<any>();
  const [password, setPassword] = useState("");
  const [matchpassword, setMatchPassword] = useState("");
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [isPasswordStrong, setIsPasswordStrong] = useState(false); // New state for password strength
  const [isPasswordVisible, setIsPasswordVisible] = React.useState(true);
  const [isMatchPasswordVisible, setIsMatchPasswordVisible] = React.useState( true);
  const [isFormValid, setIsFormValid] = useState(false); // New state for button enablement
  const [isLoading, setIsLoading] = React.useState(false); // Ações específicas como login
  
  
  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const toggleMatchPasswordVisibility = () => {
    setIsMatchPasswordVisible(!isMatchPasswordVisible);
  }

    // Function to check if the password is strong
    const checkPasswordStrength = (password: string) => {
      const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      return strongPasswordRegex.test(password);
    };

    useEffect(() => {
      // Update password strength status
      setIsPasswordStrong(checkPasswordStrength(password));
    }, [password]);

  async function handleResetPassword() {
    const tmptoken = route.params?.token;

    if (password === "" || matchpassword === "") {
      Alert.alert("Atenção", "Preencha todos os campos");
      return;
    }

    if (password !== matchpassword) {
      Alert.alert("Atenção", "As senhas não coincidem");
      return;
    }

    if (!isPasswordStrong) {
      Alert.alert("Atenção", "A senha deve ser forte.");
      return;
    }

    setIsLoading(true);
    const response = await api.put(`/reset_password/${tmptoken}`, {
      password: password,
    }).catch((error) => {
      console.log("Erro ao redefinir a senha: " + error);
      setIsLoading(false);
      Alert.alert("Atenção", "Erro ao redefinir a senha. Retorne a tela de Esqueci Minha Senha e solicite novamente.");
    }).finally(() => {
      setIsLoading(false);
    });
    setIsLoading(false);

    console.log(response);
    
    if (response.status !== 200) {
      Alert.alert("Atenção", "Erro ao redefinir a senha. Detalhes: " + response.data.error);
      return;
    }

    Alert.alert("Senha redefinida com sucesso");
    navigation.navigate("SignIn");
  }

  // Detecta quando o teclado é mostrado ou ocultado
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true); // Teclado visível
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false); // Teclado oculto
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

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
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.innerContainer}>
        {/* Mostrar a imagem apenas quando o teclado não está visível */}
        {!isKeyboardVisible && (
          <>
            <Image source={logoSmall} style={styles.imageLogo} resizeMode="stretch" />
            <Image source={emailConfirmado} style={styles.image} resizeMode="stretch" />
          </>
        )}

        <View style={styles.content}>
          <Text style={styles.title}>Redefina sua Senha {"\n"}</Text>


          <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passinput}
            keyboardType="default"
            placeholder="Insira sua nova senha"
            maxLength={20}
            secureTextEntry = {isPasswordVisible}
            placeholderTextColor={theme.colors.primary}
            onChangeText={(text) => setPassword(text)}
          />
              <TouchableOpacity onPress={togglePasswordVisibility} style={styles.iconContainer}>
                <Ionicons
                  name={isPasswordVisible ? "eye" : "eye-off"}
                  size={24}
                  color={"#0262A6"}
                />
              </TouchableOpacity>
          
          </View>
          
          {/* Password strength feedback */}
          {!isPasswordStrong && password.length > 0 && (
            <Text style={styles.passwordFeedback}>
              A senha deve ter pelo menos 8 caracteres, incluindo uma letra maiúscula, uma letra minúscula, um número e um caractere especial.
            </Text>
          )}        

          <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passinput}
            keyboardType="default"
            placeholder="Confirme sua nova senha"
            maxLength={20}
            secureTextEntry={isMatchPasswordVisible}
            placeholderTextColor={theme.colors.primary}
            onChangeText={(text) => setMatchPassword(text)}
          />
                      <TouchableOpacity onPress={toggleMatchPasswordVisibility} style={styles.iconContainer}>
              <Ionicons
                name={isMatchPasswordVisible ? "eye" : "eye-off"}
                size={24}
                color={"#0262A6"}
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.buttonSend} onPress={handleResetPassword}>
            <Text style={styles.textButtonSend}>Redefinir</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
