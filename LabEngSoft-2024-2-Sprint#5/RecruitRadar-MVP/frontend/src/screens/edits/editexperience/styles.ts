
import { StyleSheet } from 'react-native';
import { theme } from '../../../global/styles/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
    width: '100%',
  },
  buttonText: {
    color: 'blue',
    fontSize: 16,
    fontWeight: 'bold',
  },
  content: {
    //marginTop: 0,
    width: '100%',
    //alignItems: 'center',
    paddingHorizontal: 35,

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
  refreshbuttonPrimary: {
    marginTop: 20,
    marginBottom: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingVertical: 12,
    alignItems: 'center',
    
    borderWidth: 1,
    borderColor: '#0262A6',
  },
  refreshtextbuttonPrimary: {
    color: '#0262A6',
    fontSize: 18,
    fontWeight: 'bold',
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
  backButton: {
    position: "absolute",
    width: 40, // Largura do botão
    height: 40, // Altura do botão
    top: 20,
    left: 10, // Ajuste a posição conforme necessário
  },
  headerContainer: {
    alignItems: "center", // Centraliza horizontalmente todos os elementos
    paddingVertical: 20, // Espaçamento superior e inferior
    backgroundColor: theme.colors.white, // Cor de fundo do cabeçalho
  },
  title: {
    color: theme.colors.text,
    textAlign: "center",
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 5,
    fontFamily: theme.fonts.title700,
    lineHeight: 40,
  },
  experienceList: {
    marginVertical: 20,
  },
  experienceItem: {
    flexDirection: "row", // Alinha o conteúdo e o botão de remoção em uma linha
    justifyContent: "space-between", // Coloca o botão de remoção no final da linha
    alignItems: "flex-start", // Alinha o botão ao topo
    padding: 10,
    marginBottom: 20,
    borderRadius: 8,
    borderColor: "#0262A6",
    borderWidth: 1,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    position: "relative", // Permite o uso de posicionamento absoluto
  },
  experienceContent: {
    flex: 1,
  },
  removeButtonList: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  addButton: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginVertical: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    marginBottom: 20,
  },
  updateButton: {
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
  cancelButton: {
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
  saveButtonContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  saveButton: {
    backgroundColor: theme.colors.white,
    borderColor: "#0262A6",
    borderWidth: 1,
    borderRadius: 20,
    paddingVertical: 12,
    alignItems: 'center',
    width: '100%',
  },
  saveButtonText: {
    color: '#0262A6',
    fontSize: 18,
    fontWeight: 'bold',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
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
    borderWidth: 1,
    borderRadius: 8,
    marginTop: '3%',
    marginBottom: '5%',
    fontSize: 18,
    paddingHorizontal: 10,
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
  experienceText: {
    fontSize: 16,
    marginBottom: 5,
  },
  editContainer: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#0262A6",
    backgroundColor: theme.colors.white,
    padding: 20,
    borderRadius: 8,
  },
});
