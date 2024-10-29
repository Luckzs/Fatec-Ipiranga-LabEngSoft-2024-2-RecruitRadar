import { StyleSheet } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';

import { theme } from '../../../global/styles/theme';

export const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 360,
  },
  container: {
    flex: 1,
    //paddingTop: 40,
    backgroundColor: theme.colors.white,
    width: '100%',
    
    padding: 16,
  },
  label: {
    color: theme.colors.primary,
    fontFamily: theme.fonts.text500,
    fontSize: 15,
    textAlign: 'left',
    fontWeight: 'bold',
    marginBottom: 5,

  },
  input: {
    color : theme.colors.primary,
    height: 60,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    marginTop: 25,
    fontSize: 16,
    paddingHorizontal: 10,
    textAlign: 'center',
  },
  content: {
    marginTop: 0,
    width: '100%',
    paddingHorizontal: 35,
    padding:20,
    alignItems: 'center',
  },
  controlsbutons: {
    marginTop: 30,
    width: '100%',
    paddingHorizontal: 35
  },
  controls: {
    marginTop: 0,
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    width: '100%',
    paddingHorizontal: 5
  },
  title: {
    color: theme.colors.text,
    textAlign: 'center',
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 5,
    fontFamily: theme.fonts.title700,
    lineHeight: 40
  },
  imageLogo: {
    marginTop: 0,
    marginBottom: 15
  },
  linha: {
    marginTop: 15,
    marginBottom: 15
  },
  subtitle: {
    color: theme.colors.text,
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 10,
    fontFamily: theme.fonts.title500,
  },
  experienceList: {
    marginTop: 20,
  },
  experienceItem: {
    backgroundColor: theme.colors.cardBackground,
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  experienceText: {
    fontSize: 16,
    color: theme.colors.text,
    marginBottom: 5,
  },  dateInput: {
    borderColor: theme.colors.text,
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginVertical: 10,
    alignItems: 'center',
    backgroundColor: theme.colors.white,
  },
  dateText: {
    color: theme.colors.text,
    fontSize: 16,
  },
  removeButton: {
    color: theme.colors.primary,
    fontFamily: theme.fonts.text500,
    fontSize: 14,
    textAlign: 'right',
    marginTop: 5,
    textDecorationLine: 'underline',
    fontWeight: 'bold',
  },

  addButton: {
    marginTop: 20,
    marginBottom: 20,
    backgroundColor: '#0262A6',
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    width: 40,
    borderRadius: 20,
    marginLeft: 10,
},
addButtonText: {
    color: 'white',
    fontSize: 24,
},
  addExperienceButton: {
    paddingVertical: 12, // Espaçamento vertical interno
    borderRadius: 8, // Bordas arredondadas
    alignItems: 'center', // Centraliza o texto no botão
    marginTop: 20, // Espaçamento superior
    width: '100%', // Largura total do container
  },
  saveExperienceButton: {
    paddingVertical: 12, // Espaçamento vertical interno
    borderRadius: 8, // Bordas arredondadas
    alignItems: 'center', // Centraliza o texto no botão
    marginTop: 10, // Espaçamento superior
    width: '100%', // Largura total do container
  },
    text1Forgot: {
      fontSize: 20,
      color: 'black',
      fontWeight: '800',
      marginBottom: 40,
      fontFamily: 'Lora-Bold',
    },
    buttonPrimary: {
      marginTop: 20,
      backgroundColor: '#0262A6',
      borderRadius: 20,
      paddingVertical: 12,
      alignItems: 'center',
      width: '100%',
    },
    textbuttonPrimary: {
      color: 'white',
      fontSize: 20,
      fontWeight: 'bold',
    },

});