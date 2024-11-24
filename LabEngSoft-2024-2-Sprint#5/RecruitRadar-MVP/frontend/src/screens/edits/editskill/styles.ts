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
    //paddingTop: 30,
    backgroundColor: theme.colors.white,
    width: '100%',
    paddingHorizontal: 35,
    padding:20
  },

  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  addbuttonPrimary: {
    marginTop: '10%',
    marginBottom: '10%',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingVertical: 12,
    alignItems: 'center',
    width: '45%',
    borderWidth: 1,
    borderColor: '#0262A6',
  },
  addtextbuttonPrimary: {
    color: '#0262A6',
    fontSize: 18,
    fontWeight: 'bold',
  },
  resetButton: {
    flex: 1,
    marginRight: 10,
    backgroundColor: 'white',
    borderColor: 'blue',
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 5,
    width: '40%',
    alignItems: 'center',
  },
  addButton: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginVertical: 20,
  },  
  saveButton: {
    flex: 1,
    marginLeft: 10,
    backgroundColor: 'white',
    borderColor: 'blue',
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 5,
    width: '40%',
    alignItems: 'center',
  },  
refreshButton: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
    backgroundColor: 'white',
    borderColor: '#0262A6',
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 5,
  },
  saveButton1: {
    backgroundColor: theme.colors.white,
    borderColor: "#0262A6",
    borderWidth: 1,
    borderRadius: 20,
    paddingVertical: 12,
    alignItems: 'center',
    width: '100%',
  },
  studyList: {
    marginVertical: 20,
  },

  studyText: {
    fontSize: 16,
    marginBottom: 5,
  },
  button: {
    backgroundColor: 'white',
    borderColor: 'blue',
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 5,
    width: '40%',
    alignItems: 'center',
    alignSelf: 'flex-end',
  },
  buttonText: {
    color: '#0262A6',
    fontSize: 16,
    fontWeight: 'bold',
  },
  saveButtonText: {
    color: '#0262A6',
    fontSize: 18,
    fontWeight: 'bold',
  },
  label: {
    color: '#737380C2',
    fontFamily: theme.fonts.text500,
    fontSize: 18,
    textAlign: 'left',
    borderTopColor: '#737380C2',
  },
  input: {
    color: theme.colors.primary,
    fontFamily: theme.fonts.text400,
    //fontSize: 15,
    textAlign: "center",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    borderBottomColor: theme.colors.primary,
    borderBottomWidth: 2,
    //marginBottom: 20,
    height: 45,
    width: '100%',
    borderColor: '#737380C2',
    borderRadius: 8,
    marginTop: '3%',
    marginBottom: '5%',
    fontSize: 18,
    paddingHorizontal: 10,
  },
  content: {
    backgroundColor: theme.colors.white,
    //marginTop: 0,
    width: '100%',
    //alignItems: 'center',
  },
  controlsbutons: {
    marginTop: 30,
    width: '100%',
    paddingHorizontal: 35
  },
  editContainer: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#0262A6",
    backgroundColor: theme.colors.white,
    padding: 20,
    borderRadius: 8,
  },
  controls: {
    marginTop: 0,
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    width: '100%',
    paddingHorizontal: 5
  },
  backButton: {
    position: "absolute",
    width: 40, // Largura do botão
    height: 40, // Altura do botão
    top: 20,
    left: 10, // Ajuste a posição conforme necessário
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
   editButton: {
    color: '#007BFF',
    fontSize: 16,
    marginHorizontal: 10,
  },
  headerContainer: {
    alignItems: "center", // Centraliza horizontalmente todos os elementos
    paddingVertical: 20, // Espaçamento superior e inferior
    backgroundColor: theme.colors.white, // Cor de fundo do cabeçalho
  },
  imageLogo: {
    marginTop: 0,
    marginBottom: 15,
    width: 90,
    height: 90,
  },
  backIcon: {
    width: 24,
    height: 24,
    tintColor: '#FFFFFF', // white color for the icon itself
  },
  backiconContainer: {
    width: 30,
    height: 30,
    borderRadius: 20,
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: '#0262A6',
    justifyContent: 'center',
    position: 'absolute',
    top: 20,
  },
  linha: {
    marginTop: 15,
    marginBottom: 15
  },
  subtitle: {
    color: theme.colors.heading,
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 10,
    fontFamily: theme.fonts.title500,
  },  
  dateInput: {
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
  addStudyButton: {
    paddingVertical: 12, // Espaçamento vertical interno
    borderRadius: 8, // Bordas arredondadas
    alignItems: 'center', // Centraliza o texto no botão
    marginTop: 20, // Espaçamento superior
    width: '100%', // Largura total do container
  },
  saveStudyButton: {
    paddingVertical: 12, // Espaçamento vertical interno
    borderRadius: 8, // Bordas arredondadas
    alignItems: 'center', // Centraliza o texto no botão
    marginTop: 10, // Espaçamento superior
    width: '100%', // Largura total do container
  },

  studyItem: {
    flexDirection: 'row', // Alinha o conteúdo e o botão de remoção em uma linha
    justifyContent: 'space-between', // Coloca o botão de remoção no final da linha
    alignItems: 'flex-start', // Alinha o botão ao topo
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    position: 'relative', // Permite o uso de posicionamento absoluto
  },
  
  studyContent: {
    flex: 1, // Permite que o conteúdo ocupe o máximo de espaço disponível
  },
  
  removeButtonList: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  
    skillList: {
      marginVertical: 20,
      backgroundColor: theme.colors.white,
    },
  
    skillItem: {
      flexDirection: "row", // Alinha o conteúdo e o botão de remoção em uma linha
      justifyContent: "space-between", // Coloca o botão de remoção no final da linha
      alignItems: "flex-start", // Alinha o botão ao topo
      padding: 10,
      marginBottom: 10,
      borderRadius: 8,
      borderColor: "#0262A6",
      borderWidth: 1,
      borderBottomWidth: 1,
      borderBottomColor: "#ccc",
      position: "relative", // Permite o uso de posicionamento absoluto
    },
  
    skillContent: {
      flex: 1,
    },
  
    skillText: {
      fontSize: 16,
      marginBottom: 5,
      color: theme.colors.text,
    },
  
  
  

});