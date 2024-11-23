import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { styles } from './styles';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";

const Navbar = ({ newApplication, onBeforeNavigate }: { newApplication: boolean, onBeforeNavigate: (callback: () => void) => void }) => {
  
  const navigation = useNavigation<any>();

  const handleNavigation = (screen: string) => {
    onBeforeNavigate(() => navigation.navigate(screen));
  };

  return (
    <View style={styles.navbar}>
      <TouchableOpacity style={styles.navItem} onPress={() => handleNavigation('jobs')}>
        <Image source={require('../../assets/home-icon.png')} style={styles.icon} />
        <Text style={styles.textHome}>Home</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.navItem}>
        <Image source={require('../../assets/notifications-icon.png')} style={styles.icon} />
        <Text style={styles.textHome}>Notificações</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.navItem} onPress={() => handleNavigation('applications')}>
        <View style={styles.iconContainer}>
          <Image source={require('../../assets/applications-icon.png')} style={styles.icon} />
          {/* Exibe o ponto vermelho se houver uma nova candidatura */}
          {newApplication && <View style={styles.newApplicationIndicator} />}
        </View>
        <Text style={styles.textHome}>Candidaturas</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.navItem}>
        <Image source={require('../../assets/help-icon.png')} style={styles.icon} />
        <Text style={styles.textHome}>Ajuda</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Navbar;
