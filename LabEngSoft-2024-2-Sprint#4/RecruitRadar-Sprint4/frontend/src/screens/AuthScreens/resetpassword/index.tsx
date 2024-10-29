import { StatusBar } from "expo-status-bar";
import { View, Text, Image, Alert, TextInput, TouchableOpacity, Keyboard, KeyboardAvoidingView, Platform } from "react-native";
import { styles } from "./styles";
import { theme } from "../../../global/styles/theme";
import logoSmall from "../../../assets/LogoSmall.png";
import emailConfirmado from "../../../assets/Email_Confirmado.png";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import api from "../../../services/api";

export function ResetPassword({ route }: any) {
  const navigation = useNavigation<any>();
  const [password, setPassword] = useState("");
  const [matchpassword, setMatchPassword] = useState("");
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

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

    const response = await api.put(`/reset_password/${tmptoken}`, {
      password: password,
    });

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

          <TextInput
            style={styles.input}
            keyboardType="default"
            placeholder="Insira sua nova senha"
            maxLength={20}
            secureTextEntry
            placeholderTextColor={theme.colors.primary}
            onChangeText={(text) => setPassword(text)}
          />

          <TextInput
            style={styles.input}
            keyboardType="default"
            placeholder="Confirme sua nova senha"
            maxLength={20}
            secureTextEntry
            placeholderTextColor={theme.colors.primary}
            onChangeText={(text) => setMatchPassword(text)}
          />

          <TouchableOpacity style={styles.buttonSend} onPress={handleResetPassword}>
            <Text style={styles.textButtonSend}>Redefinir</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
