import { StyleSheet } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';

import { theme } from '../../../global/styles/theme';

export const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
  container: {
    flex: 1,
    paddingTop: 40,
    alignItems: 'center',
    backgroundColor: theme.colors.white,
    width: '100%'
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 10,
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
    fontSize: 18,
    fontWeight: 'bold',
    color: 'blue',
    marginBottom: 5,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
},
checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
},
checked: {
    width: 14,
    height: 14,
    backgroundColor: '#000',
},
checkboxLabel: {
    fontSize: 18,
},
errorText: {
  color: 'red',
},
header: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingVertical: 10,
},
section: {
  marginBottom: 20,
},

text: {
  fontSize: 16,
  marginBottom: 5,
},
addLink: {
  fontSize: 14,
  color: 'blue',
  textDecorationLine: 'underline',
},
buttonContainer: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginTop: 30,
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
  color: 'blue',
  fontSize: 16,
  fontWeight: 'bold',
},
  
  label: {
    color: theme.colors.primary,
    fontFamily: theme.fonts.text500,
    fontSize: 15,
    textAlign: 'left',
    fontWeight: 'bold'
  },
  inputGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
},
tagsContainer: {
  flexDirection: 'row',
  flexWrap: 'wrap', // Para que os itens quebrem a linha
  marginBottom: 10,
},
tag: {
  backgroundColor: '#f0f0f0',
  borderRadius: 20,
  paddingVertical: 5,
  paddingHorizontal: 15,
  marginRight: 10,
  flexDirection: 'row',
  marginBottom: 10,
  width: 170, // Largura atualizada
  height: 31, // Altura atualizada
  justifyContent: 'center', // Centralizar texto verticalmente
},
tagText: {
  color: '#000',
  flex: 1,
  textAlign: 'center', // Centralizar texto horizontalmente
},
addButton: {
  backgroundColor: '#0262A6',
  justifyContent: 'center',
  alignItems: 'center',
  height: 30,
  width: 30,
  borderRadius: 20,
  marginTop: 25,
},
addButtonText: {
  color: 'white',
  fontSize: 24,
},
  input: {
    flex: 1,
    marginRight: 10,
    color : theme.colors.primary,
    height: 50,
    width: '100%',
    borderColor: 'gray',
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    marginTop: 25,
    fontSize: 15,
    textAlign: 'center',
  },
  content: {
    marginTop: 0,
    width: '100%',
    paddingHorizontal: 35
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
buttonPrimary: {
  marginTop: 20,
  height: 50,
  backgroundColor: '#0262A6',
  borderRadius: 20,
  paddingVertical: 12,
  alignItems: 'center',
  width: '60%',
},
textbuttonPrimary: {
  color: 'white',
  fontSize: 20,
  fontWeight: 'bold',
},
removePosition: {
  fontSize: 16,
  alignItems: 'flex-end',
  paddingVertical: -50,
},
salaryInput: {
  borderBottomWidth: 1,
  borderBottomColor: 'gray',
  flex: 1,
  marginRight: 10,
  color: theme.colors.primary,
  height: 50,
  width: '90%',
  borderColor: 'gray',
  borderWidth: 1,
  borderRadius: 8,
  marginTop: 25,
  fontSize: 16,
  textAlign: 'center',
},
salaryinputGroup: {
  flexDirection: 'row',
  alignItems: 'center',
  marginBottom: 10,
  marginTop : 10,
  width: '100%',
},
salaryDisplayContainer: {
  flexDirection: 'row', // Coloca o texto e o ícone na mesma linha
  alignItems: 'center', // Centraliza o conteúdo verticalmente
  width: '100%', // 80% do espaço disponível
  height: 50, // Altura do campo
  borderColor: 'gray',
  borderBottomWidth: 1,
  borderBottomColor: 'gray',
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
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: 5,
},
addPositionContainer: {
  flexDirection: 'row',
  alignItems: 'center',
},
salaryContainer: {
  flexDirection: 'row',
  alignItems: 'center',
},
sliderContainer: {
  flexDirection: 'column',  // Muda o layout para coluna, empilhando os elementos
  alignItems: 'center',     // Centraliza o conteúdo
  borderWidth: 1,
  borderColor: 'gray',
  borderRadius: 8,
  padding: 15,              // Adiciona espaçamento interno
  marginBottom: 10,
  marginTop: 10,
},
slider: {
  width: '100%',            // Ajusta a largura do slider para ocupar todo o espaço disponível
  height: 40,
},
valueText: {
  fontSize: 16,
  color: 'gray',
  marginTop: 10,            // Espaçamento acima do valor de distância
},


});