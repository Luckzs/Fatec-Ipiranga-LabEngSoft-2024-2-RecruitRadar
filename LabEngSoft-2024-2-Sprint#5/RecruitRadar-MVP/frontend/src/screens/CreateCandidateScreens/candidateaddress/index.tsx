import { View, Text, Image, Alert, TouchableOpacity } from "react-native";
import { styles } from "./styles";
import logoSmall from "../../../assets/LogoBetterSmall.png";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuth } from "../../../contexts/auth";
import getLocationInfo from "../../../services/location";
import api from "../../../services/api";
import { theme } from "../../../global/styles/theme";
import { Button } from "../../../components/Button";
import { Picker } from "@react-native-picker/picker";

export function Address() {
  interface Candidato {
    full_name: string;
    CPF: string;
    sex: string;
    pcd: boolean;
    birth_date: string;
  }

  interface LocationInfo {
    address: string;
    city: string;
    state: string;
    postal_code: string;
  }

  // List of Brazilian states
  const stateList = [
    { label: "Selecione o estado", value: "" },
    { label: "AC", value: "AC" },
    { label: "AL", value: "AL" },
    { label: "AP", value: "AP" },
    { label: "AM", value: "AM" },
    { label: "BA", value: "BA" },
    { label: "CE", value: "CE" },
    { label: "DF", value: "DF" },
    { label: "ES", value: "ES" },
    { label: "GO", value: "GO" },
    { label: "MA", value: "MA" },
    { label: "MT", value: "MT" },
    { label: "MS", value: "MS" },
    { label: "MG", value: "MG" },
    { label: "PA", value: "PA" },
    { label: "PB", value: "PB" },
    { label: "PR", value: "PR" },
    { label: "PE", value: "PE" },
    { label: "PI", value: "PI" },
    { label: "RJ", value: "RJ" },
    { label: "RN", value: "RN" },
    { label: "RS", value: "RS" },
    { label: "RO", value: "RO" },
    { label: "RR", value: "RR" },
    { label: "SC", value: "SC" },
    { label: "SP", value: "SP" },
    { label: "SE", value: "SE" },
    { label: "TO", value: "TO" },
  ];

  const [CEP, setCEP] = React.useState(String);
  const [endereco, setEndereco] = React.useState(String);
  const [city, setCity] = React.useState(String);
  const [state, setState] = React.useState(String);
  const [postal_code, setPostalCode] = React.useState(String);
  const [isAddressValid, setIsAddressValid] = React.useState(false); // Novo estado para controlar a visibilidade do botão
  const { user } = useAuth();
  const [isCepFound, setIsCepFound] = React.useState(true); // New state to control city/state visibility
  const navigation = useNavigation<any>();
  const route = useRoute();
  const { candidato } = route.params as { candidato: string };

  // Converte a string JSON de volta em um objeto
  const parsedUser: Candidato = JSON.parse(candidato);

  const onChangeCEP = async () => {
    const cep = CEP.replace(/\D/g, "");
    if (cep.length !== 8) {
      Alert.alert("Erro", "Por favor, insira um CEP válido com 8 dígitos.");
      return;
    }
    try {
      const locInfo: LocationInfo = await getLocationInfo(cep);
      if (locInfo && locInfo.address) {
        setEndereco(locInfo.address);
        setCity(locInfo.city);
        setState(locInfo.state);
        setPostalCode(locInfo.postal_code);
        setIsCepFound(true); // CEP found, hide manual city/state inputs
      }
    } catch (error) {
      Alert.alert(
        "Erro",
        "CEP não encontrado. Por favor, insira manualmente as informações."
      );
      setIsCepFound(false); // CEP not found, show manual city/state inputs

      setEndereco("");
      setCity("");
      setState("");
      setPostalCode(cep);
    }
  };

  const handleNavigate = async () => {
    console.log(parsedUser);
    console.log(endereco);
    console.log(city);
    console.log(state);
    console.log(postal_code);
    console.log(user?.email);

    api
      .post("/candidate", {
        full_name: parsedUser.full_name,
        CPF: parsedUser.CPF,
        sex: parsedUser.sex,
        pcd: parsedUser.pcd,
        birth_date: parsedUser.birth_date,
        address: endereco,
        city: city,
        state: state,
        postal_code: postal_code,
        distance_radius: 10,
        user_id: user?.email,
      })
      .then((response) => {
        console.log(response);
        Alert.alert("Sucesso", "Candidato criado com sucesso");
        navigation.navigate("CandidateExperience");
        AsyncStorage.removeItem("@RRAuth:firstTime");
      })
      .catch((error) => {
        Alert.alert(
          "Erro",
          "Erro ao criar candidato: " + error.response?.data?.error
        );
      });
  };

  // Function to validate if all required address fields are filled
  const validateAddress = () => {
    const isValid =
      endereco !== "" && city !== "" && state !== "" && postal_code !== "";
    setIsAddressValid(isValid);
  };

  // Update `isAddressValid` whenever address fields change
  useEffect(validateAddress, [endereco, city, state, postal_code]);

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
            <Text style={styles.text1Forgot}>Informe o seu endereço</Text>
          </View>

          <Text style={styles.label}>CEP </Text>
          <TextInput
            style={styles.input}
            placeholder="Insira o seu CEP"
            keyboardType="numeric"
            placeholderTextColor={"#737380C2"}
            maxLength={8}
            onChangeText={(text) => {
              setCEP(text);
              if (text.length < 8) {
                setIsAddressValid(false);
                setCity("");
                setState("");
                setEndereco("");
                setPostalCode("");
              }
            }}
            onBlur={onChangeCEP}
          ></TextInput>

          <Text style={styles.label}>Endereço </Text>
          <TextInput
            style={styles.addressinput}
            placeholder="Confira se o seu endereço esta correto"
            keyboardType="default"
            value={endereco}
            onChangeText={(text) => {
              setEndereco(text);
              validateAddress();
            }}
            placeholderTextColor={"#737380C2"}
            multiline={true}
          ></TextInput>

          {!isCepFound && (
            <>
              <Text style={styles.label}>Cidade </Text>
              <TextInput
                style={styles.input}
                placeholder="Confira se a sua cidade está correta"
                value={city}
                onChangeText={(text) => {
                  setCity(text);
                  validateAddress();
                }}
                placeholderTextColor="#737380C2"
              />

              <Text style={styles.label}>Estado </Text>
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={state}
                  onValueChange={(itemValue) => {
                    setState(itemValue);
                    validateAddress();
                  }}
                  style={styles.picker}
                >
                  {stateList.map((state) => (
                    <Picker.Item
                      label={state.label}
                      value={state.value}
                      key={state.value}
                    />
                  ))}
                </Picker>
              </View>
            </>
          )}

          {isAddressValid && (
            <View style={styles.containerButtonPrimary}>
              <TouchableOpacity
                style={styles.buttonPrimary}
                onPress={handleNavigate}
              >
                <Text style={styles.textbuttonPrimary}>Continuar</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </ScrollView>
  );
}
