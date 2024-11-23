import { StyleSheet } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';

import { theme } from '../../../global/styles/theme';

export const styles = StyleSheet.create({

  label: {
    color: '#737380C2',
    fontFamily: theme.fonts.text500,
    fontSize: 18,
    textAlign: 'left',
  },

  content: {
    marginTop: 0,
    width: '100%',
    paddingHorizontal: 25
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
    fontSize: 20,
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
    color: theme.colors.heading,
    fontSize: 15,
    textAlign: 'center',
    marginBottom: 64,
    fontFamily: theme.fonts.title500,
    lineHeight: 25
  },
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
    alignItems: 'center'
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    height: 60,
  },
  backIcon: {
    width: 24,
    height: 24,
    tintColor: '#FFFFFF', // white color for the icon itself
  },
  closeIcon: {
    width: 24,
    height: 24,
    tintColor: theme.colors.primary,
  },
  logo: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  titlePrimaryContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    textAlign: 'left',
    marginRight: 10,
  },
  titlePrimary: {
    fontFamily: 'Lora-Bold',
    
    fontSize: 35,
    color: '#0262A6',
    textAlign: 'center',
  },
  passwordContainer: {
    flexDirection: 'row', // Coloca o texto e o ícone na mesma linha
    alignItems: 'center', // Centraliza o conteúdo verticalmente
    width: '100%', // 80% do espaço disponível
    height: 45, // Altura do campo
    borderColor: '#737380C2',
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    marginTop: '3%',
    marginBottom: '5%',
  },
  iconContainer: {
    width: 30,
    height: 30,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backiconContainer: {
    width: 30,
    height: 30,
    borderRadius: 20,
    alignItems: 'center',
    backgroundColor: '#0262A6',
    justifyContent: 'center',
  },
  passinput: {
    height: 45,
    fontSize: 18,  
    width: '88%',  
    paddingHorizontal: 10,
    marginTop: '3%',
    marginBottom: '5%',
  },
  passwordFeedback: {
    color: 'red',
    fontSize: 14,
    marginTop: 5,
    marginBottom: 20,
    textAlign: 'left',
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
  containerNotification: {
    marginTop: 10,
    paddingHorizontal: 20,
  },
  textNotification: {
    color: 'black',
    fontSize: 16,
    textAlign: "center",
    fontFamily: 'Lora-Bold',
    fontWeight: '400',
  },
  text1ContainerEmail: {
    flexDirection: "row",
    marginTop: "10%",
    marginBottom: "10%",
    alignItems: "flex-end",
    justifyContent: 'flex-start',

  },
  text1Email: {
    fontSize: 27,
    fontWeight: '700',
    color: 'black',
    fontFamily:'Montserrat-SemiBold',
    textAlign: 'center',
  },
  text2ContainerForgot: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: 'flex-start',
    marginBottom: '10%'
  },
  text2Forgot: {
    fontSize: 40,
    color: 'black',
    textAlign: "center",
    fontWeight: '800',
    fontFamily: 'Lora-Bold',
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
  buttonDisabled: {
    backgroundColor: '#CCC', // Light gray color to indicate disabled state
  },
  textButtonSend: {
    color: 'white',
    width: '100%',
    fontSize: 22,
    textAlign: "center",
    fontFamily: 'Lora-Bold',
  },
  
});


