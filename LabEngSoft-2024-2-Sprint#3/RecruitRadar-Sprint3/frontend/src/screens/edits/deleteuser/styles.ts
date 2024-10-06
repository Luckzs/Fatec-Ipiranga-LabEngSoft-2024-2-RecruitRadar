import { StyleSheet } from 'react-native';
import { theme } from '../../../global/styles/theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  headerContainer: {
    alignItems: "center", // Centraliza horizontalmente todos os elementos
    paddingVertical: 20, // Espaçamento superior e inferior
    backgroundColor: theme.colors.white, // Cor de fundo do cabeçalho
  },
  imageLogo: {
    marginTop: 0,
    marginBottom: 15
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
  backButton: {
    position: "absolute",
    top: 20,
    left: 10,
    zIndex: 1, // Garante que o botão de volta fique sobre outros elementos
  },
  content : {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteButton: {
    backgroundColor: "red",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignSelf: 'center', // Centraliza o botão na tela
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export { styles };
