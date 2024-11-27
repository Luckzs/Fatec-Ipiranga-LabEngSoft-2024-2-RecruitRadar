import { StyleSheet } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';

import { theme } from '../../../global/styles/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
    justifyContent: 'center',
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  loadingLogo: {
    width: 120,
    height: 120,
    marginBottom: 20,
    resizeMode: "cover",
  },
  loadingText: {
    color: "#0262A6",
    fontSize: 18,
    marginTop: 20,
  },
  innerContainer: {
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 360,
    marginBottom: 20,
  },
  imageLogo: {
    marginBottom: 15,
  },
  content: {
    width: '100%',
    paddingHorizontal: 35,
  },
  title: {
    color: theme.colors.text,
    textAlign: 'center',
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 20,
  },  passwordFeedback: {
    color: 'red',
    fontSize: 14,
    marginTop: 5,
    marginBottom: 20,
    textAlign: 'left',
  },
  passwordContainer: {
    flexDirection: 'row', // Coloca o texto e o ícone na mesma linha
    alignItems: 'center', // Centraliza o conteúdo verticalmente
    width: '88%', // 80% do espaço disponível
    height: 60, // Altura do campo
    borderColor: '#737380C2',
    alignContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    borderWidth: 1,
    borderRadius:8,
    marginLeft:20,
    marginRight:20,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  passinput: {
    
    fontSize: 16,  
    width: '90%',  
    height: 60,
    
  },
  iconContainer: {
    width: 30,
    height: 30,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    color: theme.colors.primary,
    fontSize: 15,
    height: 50,
    textAlign: "center",
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 8,
    marginBottom: 20,
  },

  buttonSend: {
    backgroundColor: '#0262A6',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    marginTop: 20,
    height: 50,
    paddingVertical: 8,
    paddingHorizontal: 20,
  },
  textButtonSend: {
    color: 'white',
    fontSize: 20,
    textAlign: "center",
    fontWeight: 'bold',
  },
});