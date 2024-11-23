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
    
    padding: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    paddingHorizontal: 15,
    height: 30,
  },
  backiconContainer: {
    width: 30,
    height: 30,
    borderRadius: 20,
    alignItems: 'center',
    backgroundColor: '#0262A6',
    justifyContent: 'center',
  },
  backIcon: {
    width: 24,
    height: 24,
    tintColor: '#FFFFFF', // white color for the icon itself
  },

  label: {
    color: '#737380C2',
    fontFamily: theme.fonts.text500,
    fontSize: 18,
    textAlign: 'left',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 30,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: '#737380C2',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  checked: {
    width: 12,
    height: 12,
    backgroundColor: '#737380C2',
  },
  checkboxLabel: {
    fontSize: 15,
    color: '#737380C2',
  },  
  input: {
    height: 45,
    width: '100%',
    borderColor: '#737380C2',
    borderWidth: 1,
    borderRadius: 8,
    marginTop: '3%',
    marginBottom: '5%',
    fontSize: 18,
    paddingHorizontal: 10,
  },
  content: {
    marginTop: 0,
    width: '100%',
    paddingHorizontal: 25,
    padding:20,
    alignItems: 'center',
  },
  inputscontainer: {
    width: '100%',
    marginTop: 20,
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
    fontSize: 30,
    fontWeight: '700',
    marginBottom: 5,
    fontFamily: 'Montserrat-SemiBold',
    lineHeight: 40
  },
  imageLogo: {
    width: 90,
    height: 90,
    marginBottom: 20,
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
  },  
  dateinputContainer: {
    flexDirection: 'row', // Coloca o texto e o ícone na mesma linha
    alignItems: 'center', // Centraliza o conteúdo verticalmente
    width: '100%', // 80% do espaço disponível
    height: 45, // Altura do campo
    borderColor: '#737380C2',
    borderBottomWidth: 1,
    borderBottomColor: 'red',
    borderWidth: 1,
    borderRadius: 8,
  },
  dateInput: {
    height: 50,
    width: '90%',
    marginTop: '5%',
    marginBottom: '5%',
    paddingHorizontal: 10,
    paddingVertical: 10,
    alignItems: 'center',
    alignContent: 'center',
    fontSize: 18,
    textAlign: 'left',
  },
  placeholderdateinput: {
    height: 50,
    width: '90%',
    color: '#737380C2',
    marginTop: '5%',
    marginBottom: '5%',
    paddingHorizontal: 10,
    paddingVertical: 10,
    alignItems: 'center',
    alignContent: 'center',
    fontSize: 18,
    textAlign: 'left',
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
      marginBottom: 20,
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
    addbuttonPrimary: {
      marginTop: '10%',
      marginBottom: '10%',
      backgroundColor: '#FFFFFF',
      borderRadius: 20,
      paddingVertical: 12,
      alignItems: 'center',
      width: '70%',
      borderWidth: 1,
      borderColor: '#0262A6',
    },
    addtextbuttonPrimary: {
      color: '#0262A6',
      fontSize: 18,
      fontWeight: 'bold',
    },

});