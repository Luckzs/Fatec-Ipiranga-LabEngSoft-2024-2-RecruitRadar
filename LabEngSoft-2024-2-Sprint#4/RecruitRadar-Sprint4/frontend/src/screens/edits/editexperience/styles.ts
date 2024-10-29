
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
  imageLogo: {
    marginTop: 0,
    marginBottom: 15,
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
    textAlign: 'center',
    fontSize: 25,
    fontWeight: 'bold',
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
    borderColor: "#ccc",
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
    paddingVertical: 12,
    borderRadius: 8,
    borderColor: "blue",
    borderWidth: 1,
    alignItems: 'center',
    width: '100%',
  },
  saveButtonText: {
    color: "blue",
    fontSize: 16,
    fontWeight: 'bold',
  },
  label: {
    color: theme.colors.primary,
    fontFamily: theme.fonts.text500,
    fontSize: 15,
    textAlign: "left",
    marginTop: 10,
    fontWeight: "bold",
  },
  input: {
    color: theme.colors.primary,
    fontFamily: theme.fonts.text400,
    fontSize: 15,
    textAlign: "center",
    borderBottomColor: theme.colors.primary,
    borderBottomWidth: 2,
    marginBottom: 20,
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
    borderColor: "ccc",
    backgroundColor: theme.colors.white,
    padding: 20,
    borderRadius: 8,
  },
});
