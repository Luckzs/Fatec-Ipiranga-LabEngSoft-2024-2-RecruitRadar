import React, { useState } from "react";
import { View, Text, FlatList, Image, TouchableOpacity, Dimensions, Modal, Button, Alert } from 'react-native';
import logoSmall from '../../assets/LogoSmall.png';
import excluir from '../../assets/excluir.png';
import { styles } from "./styles";
import { useNavigation } from "@react-navigation/native";
import {Ionicons } from '@expo/vector-icons';

import Navbar from '../../components/Navbar';
import { useAuth } from "../../contexts/auth";

type JobCardProps = {
  title: string;
  companyName: string;
  location: string;
  matchMessage: string;
  datePosted: string;
  imageUrl: string;
  description: string;
  onPressDetails: () => void; // Adicionando esta prop para o onPress
};

const JobCard: React.FC<JobCardProps> = ({
  title,
  companyName,
  location,
  matchMessage,
  datePosted,
  onPressDetails,
}) => (
  <View style={styles.card}>
    <Text style={styles.title}>{title}</Text>
    <View style={styles.cardCompanyImage}>
      <Image source={require('../../assets/detsoft.png')} style={styles.companyImage} />
      <Text style={styles.companyName}>{companyName}</Text>
    </View>
    <Text style={styles.location}>{location}</Text>
    <View style={styles.cardImageUser}>
      <Ionicons name='person' size={20} color="#0262A6" /> 
      <Text style={styles.matchMessage}>{matchMessage}</Text>
    </View>
    <Text style={styles.datePosted}>{datePosted}</Text>
    <TouchableOpacity onPress={onPressDetails}>
      <Text style={styles.detailsLink}>Detalhes da vaga</Text>
    </TouchableOpacity>
  </View>
);

const Jobs = () => {
  const { user, signOut } = useAuth();

  function handleSignOut() {
    Alert.alert(
      'Confirmação',
      'Você tem certeza que deseja sair?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Sair',
          onPress: () => {
            // Chame a função signOut apenas se o usuário confirmar
            signOut();
          },
          style: 'destructive',
        },
      ]
    );
  }
  
  const [selectedJob, setSelectedJob] = useState<null | JobCardProps>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [isSidebarVisible, setSidebarVisible] = useState(false);
  const navigation = useNavigation<any>();

  const data = [
    {
      id: '1',
      title: 'Software Engineer',
      companyName: 'Detsoft',
      location: 'São Paulo, Brasil (Remoto)',
      matchMessage: 'Seu perfil corresponde a esta vaga',
      description: 'Detsoft was born in 2013 with the mission to fight complexity to empower people in their daily lives by reinventing financial services. We are one of the world’s largest digital banking platforms, serving millions of customers across Brazil, Mexico, and Colombia. For more information, visit our institutional page https://international.detsoft.com.br/careers/',
      imageUrl: '',
      datePosted: 'Há 1 mês',
    },
    {
      id: '2',
      title: 'Product Manager',
      companyName: 'Tech Solutions',
      location: 'Rio de Janeiro, Brasil',
      matchMessage: 'Perfil parcialmente compatível',
      description: 'Gerenciamento de produtos digitais...',
      imageUrl: '',
      datePosted: 'Há 2 semanas',
    },
    {
      id: '3',
      title: 'UX Designer',
      companyName: 'Creative Labs',
      location: 'Curitiba, Brasil',
      matchMessage: 'Boa compatibilidade',
      description: 'Design de interfaces e experiências...',
      imageUrl: '',
      datePosted: 'Há 3 dias',
    },
  ];

  const goToProfile = () => {
    navigation.navigate('profileScreen'); // Substitua 'ProfileScreen' pelo nome da sua tela de perfil
  };

  const openJobDetails = (job: JobCardProps) => {
    setSelectedJob(job);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedJob(null);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleSignOut} style={styles.logoutIcon}>
          <Ionicons name='exit' size={50} color="#0262A6" />
        </TouchableOpacity>
        <TouchableOpacity onPress={goToProfile} style={styles.profileIcon}>
        <Ionicons name='person' size={40} color="#0262A6" /> 
        </TouchableOpacity>
      </View>

      <View style={styles.cardcontainer}>
        <FlatList
          data={data}
          horizontal
          showsHorizontalScrollIndicator={true}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <JobCard
              title={item.title}
              companyName={item.companyName}
              location={item.location}
              matchMessage={item.matchMessage}
              datePosted={item.datePosted}
              description={item.description}
              onPressDetails={() => openJobDetails(item)} imageUrl={""}            
              />
          )}
          snapToAlignment='center'
          decelerationRate='normal'
          snapToInterval={Dimensions.get('window').width * 0.8}
          contentContainerStyle={{ paddingHorizontal: Dimensions.get('window').width * 0.1 }}
        />
      </View>

      <View style={styles.containerLike}>
        <TouchableOpacity style={styles.dislike}>
          <Ionicons   style={styles.dislike} name='close-circle-outline' size={60} color="red" /> 
        </TouchableOpacity>
        <TouchableOpacity style={styles.like}>
          <Ionicons style={styles.like} name='checkmark-circle-outline' size={60} color="green" /> 
        </TouchableOpacity>
      </View>

      <Navbar />

    
      {/* Modal de Detalhes da Vaga */}
      {selectedJob && (
        <Modal
          visible={modalVisible}
          transparent={true}
          animationType="slide"
          onRequestClose={closeModal}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>

                <Text style={styles.modalTitle}>{selectedJob.title}</Text>
              </View>
              <View style={styles.companyInfo}>
                <Image source={require('../../assets/detsoft.png')} style={styles.companyLogo} />
                <View>
                  <Text style={styles.companyName}>{selectedJob.companyName}</Text>
                  <Text style={styles.location}>{selectedJob.location}</Text>
                  <Text style={styles.datePosted}>Anunciada {selectedJob.datePosted}</Text>
                </View>
              </View>

              <Text style={styles.sectionTitle}>Sobre a vaga</Text>
              <Text style={styles.modalDescription}>{selectedJob.description}</Text>
              
              <Button title="Fechar" onPress={closeModal} />
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

export default Jobs;
