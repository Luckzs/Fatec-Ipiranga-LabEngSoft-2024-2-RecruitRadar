import { StatusBar } from "expo-status-bar";
import {
  View,
  Text,
  Image,
  Alert,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { styles } from "./styles";
import { theme } from "../../../global/styles/theme";
import logoSmall from "../../../assets/LogoSmall.png";
import { Button } from "../../../components/Button";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import React, { useRef, useState, useEffect } from "react";
import { useAuth } from "../../../contexts/auth";

export function CreateUser() {
  const [user, setUser] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [matchpassword, setMatchPassword] = React.useState("");
  const { signUp } = useAuth();

  const navigation = useNavigation<any>();

  const handleSignUp = () => {
    console.log("user", user+ " email", email+ " password", password);
    if (
      user === "" ||
      email === "" ||
      password === "" ||
      matchpassword === ""
    ) {
      Alert.alert("Atenção", "Preencha todos os campos");

      console.log("Atenção", "Preencha todos os campos");
      return;
    }

    if (password !== matchpassword) {
      Alert.alert("Atenção", "As senhas não coincidem");
      console.log("Atenção", "As senhas não coincidem");
      return;
    }

    
    signUp(user, email, password)
      .then(() => {
        Alert.alert("Atenção", "Usuário criado com sucesso");
        console.log("Atenção", "Usuário criado com sucesso");
      })
      .catch((error) => {
        Alert.alert("Atenção", error.message);
        console.log("Atenção", error.message);
      });
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
          <View style={styles.text1ContainerEmail}>
            <Text style={styles.text1Email}>Insira os dados da sua conta</Text>
          </View>

          <TextInput
            style={styles.input}
            placeholder="Insira seu nome de usuário"
            keyboardType="email-address"
            placeholderTextColor={theme.colors.primary}
            maxLength={20}
            onChangeText={(text) => setUser(text)}
          ></TextInput>

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
            secureTextEntry
            placeholderTextColor={theme.colors.primary}
            onChangeText={(text) => setPassword(text)}
          ></TextInput>

          <TextInput
            style={styles.input}
            keyboardType="default"
            placeholder="Confirme a sua senha"
            maxLength={20}
            secureTextEntry
            placeholderTextColor={theme.colors.primary}
            onChangeText={(text) => setMatchPassword(text)}
          ></TextInput>
        </View>

        <TouchableOpacity style={styles.buttonSend} onPress={handleSignUp}>
          <Text style={styles.textButtonSend}>Inscrever-se</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
