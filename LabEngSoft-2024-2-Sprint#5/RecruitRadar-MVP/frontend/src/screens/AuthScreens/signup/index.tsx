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
import {
  Ionicons,
  FontAwesome5,
  MaterialIcons,
  Feather,
} from "@expo/vector-icons";

export function CreateUser() {
  const [user, setUser] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [matchpassword, setMatchPassword] = React.useState("");
  const [isPasswordVisible, setIsPasswordVisible] = React.useState(true);
  const [isMatchPasswordVisible, setIsMatchPasswordVisible] = React.useState( true);
  const [isFormValid, setIsFormValid] = useState(false); // New state for button enablement
  const [isPasswordStrong, setIsPasswordStrong] = useState(false); // New state for password strength
  const [isLoading, setIsLoading] = React.useState(false); // Ações específicas como login
  const { signUp } = useAuth();

  const navigation = useNavigation<any>();

  const handleSignUp = () => {
    
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

    if (!isPasswordStrong) {
      Alert.alert("Atenção", "A senha deve ser forte.");
      return;
    }

    setIsLoading(true);
    signUp(user, email, password)
      .then(() => {
        setIsLoading(false);
        console.log("Atenção", "Usuário criado com sucesso");
      })
      .catch((error) => {
        setIsLoading(false);
        Alert.alert("Atenção", error.message);
        console.log("Atenção", error.message);
      }).finally(() => {
        setIsLoading(false);
      });
  };

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
    // Check if all fields are filled
    setIsFormValid(user !== "" && email !== "" && password !== "" && matchpassword !== "" &&
      isPasswordStrong);
  }, [user, email, password, matchpassword, isPasswordStrong]);
  
  useEffect(() => {
    // Update password strength status
    setIsPasswordStrong(checkPasswordStrength(password));
  }, [password]);

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
    <ScrollView style={styles.scrollview}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backiconContainer}
        >
          <Ionicons
            name="arrow-back"
            size={24}
            style={styles.backIcon}
            color={"#FFFFFF"}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.titlePrimaryContainer}>
            <Text style={styles.titlePrimary}>Recruit </Text>
            <Image
              source={logoSmall}
              style={styles.logo}
              resizeMode="stretch"
            />
            <Text style={styles.titlePrimary}> Radar</Text>
          </View>
          <View style={styles.text1ContainerEmail}>
            <Text style={styles.text1Email}>Insira os dados da sua conta</Text>
          </View>

          <Text style={styles.label}>Nome</Text>
          <TextInput
            style={styles.input}
            placeholder="Insira seu nome de usuário"
            keyboardType="email-address"
            placeholderTextColor={"#737380C2"}
            maxLength={20}
            onChangeText={(text) => setUser(text)}
          ></TextInput>

          <Text style={styles.label}>E-mail</Text>
          <TextInput
            style={styles.input}
            placeholder="Insira seu e-mail"
            keyboardType="email-address"
            placeholderTextColor={"#737380C2"}
            maxLength={50}
            onChangeText={(text) => setEmail(text)}
          ></TextInput>

          <Text style={styles.label}>Senha</Text>
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.passinput}
              keyboardType="default"
              placeholder="Insira sua senha"
              maxLength={20}
              secureTextEntry = {isPasswordVisible}
              placeholderTextColor={"#737380C2"}
              onChangeText={(text) => setPassword(text)}
            ></TextInput>
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

          <Text style={styles.label}>Confirme a senha</Text>
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.passinput}
              keyboardType="default"
              placeholder="Confirme a sua senha"
              maxLength={20}
              secureTextEntry={isMatchPasswordVisible}
              placeholderTextColor={"#737380C2"}
              onChangeText={(text) => setMatchPassword(text)}
            ></TextInput>
            <TouchableOpacity onPress={toggleMatchPasswordVisibility} style={styles.iconContainer}>
              <Ionicons
                name={isMatchPasswordVisible ? "eye" : "eye-off"}
                size={24}
                color={"#0262A6"}
              />
            </TouchableOpacity>
          </View>



        </View>

        <TouchableOpacity  disabled={!isFormValid}
           style={[styles.buttonSend, !isFormValid && styles.buttonDisabled]} // Apply disabled style if not valid
           onPress={handleSignUp}>
          <Text style={styles.textButtonSend}>Inscrever-se</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
