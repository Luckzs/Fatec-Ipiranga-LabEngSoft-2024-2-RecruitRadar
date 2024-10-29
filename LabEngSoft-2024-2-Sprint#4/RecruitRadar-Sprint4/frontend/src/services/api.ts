import axios from "axios";
import { Platform } from "react-native";
import * as Linking from 'expo-linking';

// Obter o IP dinâmico da aplicação Expo de forma síncrona
const getApiBaseUrl = () => {
  const expoUrl = Linking.createURL('/');
  const ip = expoUrl.split('/')[2];  // Extrai o IP do link gerado pelo Expo
  return `http://${ip.replace(':8081', ':3000')}`;
};

let baseURL;

console.log("Public Node Env:", process.env.EXPO_PUBLIC_NODE_ENV);
// Definir a baseURL de acordo com o ambiente
if (process.env.EXPO_PUBLIC_NODE_ENV === "development") {
  console.log("Development mode");
  baseURL =
    Platform.OS === "web" ? "http://localhost:3000" : getApiBaseUrl();
  console.log("API base URL:", baseURL);
} else {
  console.log("Production mode");
  baseURL =
    process.env.EXPO_PUBLIC_BASEURL;
  console.log("API base URL:", baseURL);
}

// Criar a instância do Axios com a baseURL dinâmica
const api = axios.create({
    baseURL: baseURL,
    //timeout: 2000
});

export default api;