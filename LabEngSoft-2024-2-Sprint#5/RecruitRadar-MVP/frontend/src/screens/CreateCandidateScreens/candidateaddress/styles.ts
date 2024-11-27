import { StyleSheet } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';
import { theme } from '../../../global/styles/theme';

export const styles = StyleSheet.create({
  scrollview:{
    fontFamily: 'Lora-Bold',
    backgroundColor: '#FFFFFF',
  },
  container: {
    fontFamily: 'Lora-Bold',
    backgroundColor: '#FFFFFF',
    padding: 10,
    width: '100%',
    height: '100%',
    flex: 1,
    paddingTop: 40,
    alignItems: 'center',
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
  header: {
    width: '100%',
    height: 60,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  backIcon: {
    width: 35,
    height: 35,
    tintColor: '#0262A6',
  },
  content: {
    flex: 1,
    marginTop: 0,
    width: '100%',
    paddingHorizontal: 20,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  text1ContainerForgot:{
    flexDirection:"row",
    alignItems:"center",
    justifyContent: 'center',
    marginBottom: 30,
    
  },
  text1Forgot: {
    fontSize: 30,
    color: 'black',
    textAlign:"left",
    fontWeight:'700',
    fontFamily:'Montserrat-SemiBold',

  },
  titlePrimaryContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  titlePrimary: {
    fontFamily: 'Lora-Bold',
    fontWeight: '800',
    fontSize: 32,
    color: '#0262A6',
    textAlign: 'center',
  },
  logo: {
    width: 40,
    height: 40,
    marginHorizontal: 5,
    resizeMode: 'contain',
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
    marginTop: '3%',
    marginBottom: '5%',
  },
  dateinput: {
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
    color: '#737380C2',
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
  
  picker: {
    width: '100%', // Faz o picker ocupar toda a largura do contêiner
    height: 45, // Define a altura do picker
    color: '', // Define a cor do texto do picker,
    fontSize: 18,
    
  },
  pickerContainer: {
    borderWidth: 1, // Define a largura da borda
    borderColor: '#737380C2', // Define a cor da borda
    height: 45, // Define a altura da caixa do Picker
    borderRadius: 8, // Define o arredondamento da borda
    overflow: 'hidden', // Garante que o conteúdo do Picker não ultrapasse as bordas arredondadas
    width: '100%', // Define a largura da caixa do Picker
    marginTop: '3%',
    marginBottom: '5%'
  },
  controlsbutons: {
    marginTop: 30,
    width: '100%',
    paddingHorizontal: 35,
  },
  controls: {
    marginTop: 0,
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    width: '100%',
    paddingHorizontal: 5,
  },
  label: {
    color: '#737380C2',
    fontFamily: theme.fonts.text500,
    fontSize: 18,
    textAlign: 'left',
  },  
  containerButtonPrimary: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginTop: 40,
  },
  buttonPrimary: {
    backgroundColor: '#0262A6',
    borderRadius: 20,
    width: '80%',
    maxWidth: 300,
    paddingVertical: 8,
    alignItems: 'center',
  },
  textbuttonPrimary: {
    fontFamily: theme.fonts.textLora,
    color: 'white',
    fontSize: 22,
    textAlign: 'center',
  },
  title: {
    color: theme.colors.text,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
    fontFamily: theme.fonts.title700,
    lineHeight: 40,
  },
  subtitle: {
    color: theme.colors.heading,
    fontSize: 15,
    textAlign: 'center',
    marginBottom: 64,
    fontFamily: theme.fonts.title500,
    lineHeight: 25,
  },
  imageLogo: {
    width: 90,
    height: 90,
    marginTop: 0,
    marginBottom: 15,
    textAlign: 'center',
    justifyContent  : 'center',
  },
  linha: {
    marginTop: 15,
    marginBottom: 15,
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
  buttonSend: {
    backgroundColor: '#0262A6',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    marginTop: 20,
    paddingVertical: 8,
    paddingHorizontal: 20,
  },
  textButtonSend: {
    color: 'white',
    width: '100%',
    fontSize: 22,
    textAlign: 'center',
    fontFamily: 'Lora-Bold',
  },
  textNotification: {
    color: 'black',
    fontSize: 16,
    textAlign: 'center',
    fontFamily: 'Lora-Bold',
    fontWeight: '400',
  },
  addressinput: {
    height: 60,
    width: '100%',
    borderColor: '#737380C2',
    borderWidth: 1,
    borderRadius: 8,
    fontSize: 16,
    paddingHorizontal: 10,
    marginTop: '3%',
    marginBottom: '5%',
    textAlign: 'justify',
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
});
