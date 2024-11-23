import { StyleSheet } from "react-native";
import { BorderlessButton } from "react-native-gesture-handler";

import { theme } from "../../../global/styles/theme";

export const styles = StyleSheet.create({
  scrollView: {
    
    backgroundColor: theme.colors.white,
  },
  container: {
    paddingTop: 20,
    alignItems: "center",
    backgroundColor: theme.colors.white,
    width: "100%",
  },
  backButton: {
    position: "absolute",
    top: 20,
    left: 20,
    zIndex: 10,
  },
  backiconContainer: {
    width: 30,
    height: 30,
    borderRadius: 20,
    marginLeft: 10,
    alignItems: "center",
    backgroundColor: "#0262A6",
    justifyContent: "center",
    alignSelf: "flex-start",
  },
  backIcon: {
    width: 24,
    height: 24,
    tintColor: "#FFFFFF", // white color for the icon itself
  },
  title: {
    color: theme.colors.text,
    textAlign: "center",
    fontSize: 25,
    fontWeight: "bold",
    fontFamily: theme.fonts.title700,
    lineHeight: 40,
    alignSelf: "center",
  },
  imageLogo: {
    marginTop: 0,
    marginBottom: 15,
    alignSelf: "center",
    width: 90,
    height: 90,
  },
  headerContainer: {
    alignItems: "center", // Centraliza horizontalmente todos os elementos
    paddingVertical: 10, // Espaçamento superior e inferior
    backgroundColor: theme.colors.white, // Cor de fundo do cabeçalho
  },
  linha: {
    marginTop: 15,
    marginBottom: 15,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "blue",
    marginBottom: 5,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: "#000",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  checked: {
    width: 14,
    height: 14,
    backgroundColor: "#000",
  },
  checkboxLabel: {
    fontSize: 18,
  },
  errorText: {
    color: "red",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
  },
  section: {
    marginBottom: 10,
  },

  text: {
    fontSize: 16,
    marginBottom: 5,
  },
  addLink: {
    fontSize: 14,
    color: "blue",
    textDecorationLine: "underline",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 30,
  },
  button: {
    backgroundColor: "white",
    borderColor: "blue",
    borderWidth: 1,
    marginBottom: 20,
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 5,
    width: "50%",
    alignItems: "center",
    alignSelf: "flex-end",
  },
  buttonText: {
    color: "blue",
    fontSize: 16,
    fontWeight: "bold",
  },

  label: {
    color: theme.colors.primary,
    fontFamily: theme.fonts.text500,
    fontSize: 15,
    textAlign: "left",
    fontWeight: "bold",
  },
  inputGroup: {
    //flexDirection: 'row',
    //alignItems: 'center',
    //marginBottom: 10,
    width: "100%",
  },
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap", // Para que os itens quebrem a linha
    marginTop: 10,
  },
  tag: {
    backgroundColor: "#f0f0f0",
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 15,
    marginRight: 10,
    flexDirection: "row",
    marginBottom: 10,
    width: '100%', // Largura atualizada
    height: 31, // Altura atualizada
    justifyContent: "center", // Centralizar texto verticalmente
  },
  tagText: {
    color: "#000",
    flex: 1,
    textAlign: "center", // Centralizar texto horizontalmente
  },
  addButton: {
    backgroundColor: "#0262A6",
    justifyContent: "center",
    alignItems: "center",
    height: 30,
    width: 30,
    borderRadius: 20,
    marginTop: 25,
  },
  addButtonText: {
    color: "white",
    fontSize: 24,
  },
  addbuttonPrimary: {
    alignSelf: "flex-end",
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    paddingVertical: 12,
    alignItems: "center",
    width: "50%",
    borderWidth: 1,
    borderColor: "#0262A6",
    justifyContent: "center",
    alignContent: "center",
  },
  addtextbuttonPrimary: {
    color: "#0262A6",
    fontSize: 14,
    fontWeight: "bold",
  },

  addbuttonPrimary1: {
    alignSelf: "flex-end",
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    paddingVertical: 12,
    alignItems: "center",
    width: "60%",
    borderWidth: 1,
    borderColor: "#0262A6",
    justifyContent: "center",
    alignContent: "center",
    marginBottom: 20,
    marginTop: 20,
  },
  addtextbuttonPrimary1: {
    color: "#0262A6",
    fontSize: 16,
    fontWeight: "bold",
  },
  carlabel: {
    color: "#737380C2",
    fontFamily: theme.fonts.text500,
    fontSize: 18,
    textAlign: "left",
    borderTopColor: "#737380C2",
    marginTop: 10,
  },
  carlabel2: {
    color: "#737380C2",
    fontFamily: theme.fonts.text500,
    fontSize: 18,
    textAlign: "left",
    borderTopColor: "#737380C2",
    marginTop: 20,
  },
  input: {
    flex: 1,
    //color : theme.colors.primary,
    //height: 50,
    //width: '100%',
    //borderColor: 'gray',
    //borderBottomWidth: 1,
    //borderBottomColor: 'gray',
    //borderWidth: 1,
    //borderRadius: 8,
    marginTop: 15,
    //fontSize: 15,
    //textAlign: 'left',
    marginRight: 10,
    color: theme.colors.primary,
    height: 50,
    width: "100%",
    borderColor: "gray",
    borderBottomWidth: 1,
    borderBottomColor: "gray",
    borderWidth: 1,
    borderRadius: 8,
    fontSize: 15,
    textAlign: "center",
  },
  input2: {
    marginRight: 10,
    color: theme.colors.primary,
    height: 50,
    width: "100%",
    borderColor: "gray",
    borderBottomWidth: 1,
    borderBottomColor: "gray",
    borderWidth: 1,
    borderRadius: 8,
    fontSize: 15,
    textAlign: "center",
    marginTop: 10,
  },
  dropdownList: {
    
    maxHeight: 150, // Limita a altura para permitir rolagem interna
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#ccc",
    marginTop: 5,
    borderRadius: 5,
    zIndex: 1000,
    overflow: "hidden", // Controla o conteúdo para manter a lista na área visível
  },
  dropdownItem: {
    padding: 10, // Espaçamento interno para maior clique e visualização
    borderBottomWidth: 1, // Linha divisória entre itens
    borderBottomColor: "#eee", // Cor clara para a linha divisória
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Fundo semi-transparente para destacar o modal
    padding: 20,
  },
  modalContent: {
    width: "100%",
    maxHeight: "70%", // Limita a altura do conteúdo do modal
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
  },
  closeButton: {
    marginTop: 15,
    textAlign: "center",
    padding: 10,
    backgroundColor: "#ddd",
    borderRadius: 5,
    color: "black",
  },

  content: {
    backgroundColor: theme.colors.white,
    //marginTop: 0,
    width: "100%",
    //alignItems: 'center',
    paddingHorizontal: 17,
  },
  controlsbutons: {
    marginTop: 30,
    width: "100%",
    paddingHorizontal: 35,
  },
  controls: {
    marginTop: 0,
    justifyContent: "space-evenly",
    flexDirection: "row",
    width: "100%",
    paddingHorizontal: 5,
  },
  buttonPrimary: {
    marginTop: 20,
    height: 50,
    backgroundColor: "#0262A6",
    borderRadius: 20,
    paddingVertical: 12,
    alignItems: "center",
    width: "60%",
  },
  textbuttonPrimary: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  removePosition: {
    fontSize: 16,
    alignItems: "flex-end",
    paddingVertical: -50,
  },
  salaryInput: {
    borderBottomWidth: 1,
    borderBottomColor: "gray",
    flex: 1,
    marginRight: 10,
    color: theme.colors.primary,
    height: 50,
    width: "90%",
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 8,
    marginTop: 25,
    fontSize: 16,
    textAlign: "center",
  },
  salaryinputGroup: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    marginTop: 10,
    width: "100%",
  },
  salaryDisplayContainer: {
    flexDirection: "row", // Coloca o texto e o ícone na mesma linha
    alignItems: "center", // Centraliza o conteúdo verticalmente
    width: "100%", // 80% do espaço disponível
    height: 50, // Altura do campo
    borderColor: "gray",
    borderBottomWidth: 1,
    borderBottomColor: "gray",
    borderWidth: 1,
    borderRadius: 8,
  },

  salaryText: {
    fontSize: 16,
    width: "80%",
    marginRight: 10, // Espaçamento entre o texto e o ícone
    color: theme.colors.primary, // Ou qualquer outra cor que desejar
    paddingHorizontal: 10, // Espaçamento interno
  },
  positionItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  addPositionContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  salaryContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  sliderContainer: {
    flexDirection: "column", // Muda o layout para coluna, empilhando os elementos
    alignItems: "center", // Centraliza o conteúdo
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 8,
    padding: 15, // Adiciona espaçamento interno
    marginBottom: 10,
    marginTop: 10,
  },
  slider: {
    width: "100%", // Ajusta a largura do slider para ocupar todo o espaço disponível
    height: 40,
  },
  valueText: {
    fontSize: 16,
    color: "gray",
    marginTop: 10, // Espaçamento acima do valor de distância
  },
});
