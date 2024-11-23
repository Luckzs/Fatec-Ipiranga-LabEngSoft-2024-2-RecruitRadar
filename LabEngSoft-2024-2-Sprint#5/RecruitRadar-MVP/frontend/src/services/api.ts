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

// Variável para controle do número de requisições em andamento
let activeRequests = 0;

// Definir o limite máximo de requisições simultâneas
const MAX_REQUESTS = 10;

// Configurar o interceptor de requisição
api.interceptors.request.use(
  (config) => {
    if (activeRequests >= MAX_REQUESTS) {
      console.log("Ignorando requisição enquanto outra está em andamento.");
      return Promise.reject("Requisição ignorada.");
    }
    activeRequests++; // Incrementa o contador de requisições
    console.log(`Requisição iniciada. Requisições ativas: ${activeRequests}`);
    return config;
  },
  (error) => {
    console.error("Erro no interceptor de requisição:", error);
    return Promise.reject(error);
  }
);

// Configurar o interceptor de resposta
api.interceptors.response.use(
  (response) => {
    activeRequests--; // Decrementa o contador após a resposta
    console.log(`Requisição concluída. Requisições ativas: ${activeRequests}`);
    return response;
  },
  (error) => {
    activeRequests--; // Decrementa o contador em caso de erro
    console.error("Erro no interceptor de resposta:", error);
    return Promise.reject(error);
  }
);


// Fazer uma requisição inicial assim que o Axios é configurado
(async () => {
  try {
    console.log("Executando requisição inicial...");
    const response = await api.get('/health'); // Substitua "/endpoint" pelo seu endpoint inicial
    console.log("Dados da requisição inicial:", response.data);
  } catch (error) {
    console.error("Erro na requisição inicial:", error);
  }
})();

export default api;