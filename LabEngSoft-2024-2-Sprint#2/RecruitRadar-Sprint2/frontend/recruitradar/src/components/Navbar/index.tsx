import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { styles } from './styles';
import {Ionicons } from '@expo/vector-icons';

const Navbar = () => {
  return (
    <View style={styles.navbar}>

      <TouchableOpacity style={styles.navItem}>
        <Ionicons style={styles.icon}  name="home" size={24} color="white" />
        <Text style={styles.textHome}>Home</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.navItem}>
        <Ionicons style={styles.icon} name="notifications" size={24} color="white" />
        <Text style={styles.textHome}>Notificações</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.navItem}>
        <Ionicons style={styles.icon} name="briefcase" size={24} color="white" />
        <Text style={styles.textHome}>Candidaturas</Text>
      </TouchableOpacity>
  
      <TouchableOpacity style={styles.navItem}>
        <Ionicons style={styles.icon} name="help" size={24} color="white" />
        <Text style={styles.textHome}>Ajuda</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Navbar;
