import axios from "axios";
import { Platform } from "react-native";
import * as Linking from 'expo-linking';

// Obter o IP dinâmico da aplicação Expo de forma síncrona
const getApiBaseUrl = () => {
  const expoUrl = Linking.createURL('/');
  const ip = expoUrl.split('/')[2];  // Extrai o IP do link gerado pelo Expo
  return `http://${ip.replace(':8081', ':3000')}`;
};

// Definir a baseURL de acordo com a plataforma
const baseURL = Platform.OS === 'web' 
  ? 'http://localhost:3000' 
  : getApiBaseUrl();

// Criar a instância do Axios com a baseURL dinâmica
const api = axios.create({
    baseURL: baseURL,
    //timeout: 2000
});

export default api;
