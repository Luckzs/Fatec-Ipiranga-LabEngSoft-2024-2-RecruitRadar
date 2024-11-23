import React from "react";
import { View, Text, Alert, TouchableOpacity } from "react-native";
import { styles } from "./styles"; // Adapte o caminho para o seu arquivo de estilos
import { Ionicons } from "@expo/vector-icons";
import { Image } from "react-native";
import logoSmall from "../../../assets/LogoSmall.png"; // Adapte o caminho para o seu arquivo de imagem
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import api from "../../../services/api"; // Ajuste o caminho conforme necessário
import { useAuth } from "../../../contexts/auth"; // Ajuste o caminho conforme necessário

interface User {
  email: string;
  user_id: string;
  // Adicione outros campos necessários
}

interface ProfileData {
  candidate_id: string;
  full_name: string;
  distance_radius: number;
  CPF: string;
  pcd: boolean;
  birth_date: string; // Data no formato ISO
  address: string;
  city: string;
  state: string;
  postal_code: string;
  User: User;
}

// Definindo o tipo de navegação e rotas
type RootStackParamList = {
  Settings: { profileData: ProfileData };
};

// Definindo o tipo da rota
type SettingsRouteProp = RouteProp<RootStackParamList, "Settings">;

export function Settings() {
  const route = useRoute<SettingsRouteProp>(); // Obtendo os parâmetros da rota
  const navigation = useNavigation<any>();
  const { user, signOut } = useAuth();

  const profileData = route.params.profileData; // Obtendo os dados do perfil
  const user_id = profileData.User.user_id; // Obtendo o user_id do profileData

  const handleNav = () => {
    navigation.goBack();
  };

  const handleDeleteAccount = async () => {
    Alert.alert("Confirmação", "Tem certeza que deseja excluir sua conta?", [
      {
        text: "Cancelar",
        style: "cancel",
      },
      {
        text: "Excluir",
        onPress: async () => {
          try {
            // Exclua o usuário através da API
            await api.delete(`/user/${user_id}`); // Ajuste a URL da API conforme necessário
            // Após a exclusão, faça logout do usuário e navegue para a tela de login ou inicial
            await signOut();
          } catch (error: any) {
            console.error(error);
            Alert.alert(
              "Erro",
              "Erro ao excluir a conta. Tente novamente mais tarde."+ error.response.data.error
            );
          }
        },
        style: "destructive",
      },
    ]);
  };

  return (
    <View style={styles.container}>
                <View style={styles.headerContainer}>
            <Image
              source={logoSmall}
              style={styles.imageLogo}
              resizeMode="stretch"
            />
            <Text style={styles.title}>Configurações</Text>
            {/* Botão de Retorno */}
            <TouchableOpacity style={styles.backButton} onPress={handleNav}>
              <Ionicons name="arrow-back" size={24} color="black" />
            </TouchableOpacity>
          </View>
      <View style={styles.content}>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={handleDeleteAccount}
        >
          <Text style={styles.buttonText}>Excluir Conta</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
