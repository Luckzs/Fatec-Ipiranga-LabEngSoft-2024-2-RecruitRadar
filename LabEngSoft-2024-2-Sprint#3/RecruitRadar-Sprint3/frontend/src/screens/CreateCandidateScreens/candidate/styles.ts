import { StyleSheet } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';
import { theme } from '../../../global/styles/theme';

export const styles = StyleSheet.create({
  container: {
    fontFamily: 'Lora-Bold',
    backgroundColor: '#FFFFFF',
    padding: 16,
    width: '100%',
    height: '100%',
    flex: 1,
    paddingTop: 40,
    alignItems: 'center',
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
    paddingHorizontal: 35,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  text1ContainerForgot:{
    flexDirection:"row",
    alignItems:"flex-end",
    justifyContent: 'flex-start',
    marginBottom: 20,
    
  },
  text1Forgot: {
    fontSize: 35,
    color: 'black',
    textAlign:"left",
    fontWeight:'800',
    fontFamily:'Lora-Bold',
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
  dateinput: {
    height: 60,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    marginTop: '5%',
    marginBottom: '5%',
    paddingHorizontal: 10,
    paddingVertical: 10,
    
    fontSize: 16,
    textAlign: 'center',
    color: 'theme.colors.primary',

  },
  input: {
    height: 60,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    marginTop: '5%',
    marginBottom: '5%',
    fontSize: 16,
    paddingHorizontal: 10,
  },
  picker: {
    width: '100%', // Faz o picker ocupar toda a largura do contêiner
    height: 60, // Define a altura do picker
  },
  pickerContainer: {
    borderWidth: 1, // Define a largura da borda
    borderColor: 'grey', // Define a cor da borda
    
    height: 55, // Define a altura da caixa do Picker
    borderRadius: 8, // Define o arredondamento da borda
    overflow: 'hidden', // Garante que o conteúdo do Picker não ultrapasse as bordas arredondadas
    width: '100%', // Define a largura da caixa do Picker
    marginTop: '5%',
    marginBottom: '5%',
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
    color: theme.colors.primary,
    fontFamily: theme.fonts.text500,
    fontSize: 15,
    textAlign: 'left',
    fontWeight: 'bold',
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
});
