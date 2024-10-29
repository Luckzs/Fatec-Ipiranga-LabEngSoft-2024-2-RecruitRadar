import { StyleSheet } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';

import { theme } from '../../../global/styles/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    alignItems: 'center',
    backgroundColor: theme.colors.white,
    width: '100%'
  },
  titlePrimaryContainer: {
    flexDirection: "row",
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 25, // Ajusta o espaçamento inferior
  },
  titlePrimary: {
    fontFamily: 'Lora-Bold',
    fontWeight:'800',
    fontSize: 40,
    color: '#0262A6',
  },
  logo: {
    width: 50,
    height: 50, // Definindo um valor fixo para altura
  },
  label: {
    color: theme.colors.primary,
    fontFamily: theme.fonts.text500,
    fontSize: 15,
    textAlign: 'left',
    fontWeight: 'bold'
  },
  input: {
    height: 60,
    width:'auto',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius:8,
    marginBottom: 16,
    marginTop:10,
    marginLeft:20,
    marginRight:20,
    paddingHorizontal: 10,
  },
  text1Container:{
    flexDirection:"row",
    marginTop:"20%",
    alignItems:"flex-end",
    justifyContent: 'center',
  },
  text1: {
    fontSize: 36,
    color: '#0262A6',
    marginBottom: 20,
    textAlign:"left",
    fontWeight:'800',
    fontFamily:'Lora-Bold',
  },  
  text2Container:{
    flexDirection:"row",
    alignItems:"center",
    marginBottom: 40,
    justifyContent: 'center',
  },
  text2:{
    fontSize: 18,
    color: '#5062a6',
    textAlign:"center",
    fontFamily:'Lora-Regular',
    fontWeight:'400'
  },
  content: {
    marginTop: 0,
    width: '100%',
    paddingHorizontal: 35,
    
    justifyContent: 'center',
    marginBottom: "50%",
    backgroundColor: '#FFFFFF',
  },
  controlsbutons: {
    marginTop: 30,
    width: '100%',
    paddingHorizontal: 35
  },
  buttonRegister: {
    backgroundColor: '#0262A6',
    borderColor: 'transparent',
    justifyContent:'center',
    alignItems:'center',
    borderRadius: 30,
    cursor: 'pointer',
    width: '100%',
    maxWidth: 600,
    marginTop: 30,
    paddingVertical: 8,
    paddingHorizontal: 20,
  },
  textButtonRegister:{
    color: 'white',
    fontSize:32,
    textAlign:"center",
  },

  controls: {
    marginTop: 0,
    flexDirection: 'row',
    justifyContent: 'flex-end', // Alinha o texto à direita
    width: '100%',
    paddingRight: 20, // Espaçamento à direita
    alignItems: 'center', // Centraliza verticalmente o conteúdo
  },
  
  forgotPasswordButton: {
    width: 'auto', // Permite que o botão ajuste seu tamanho automaticamente
  },

  forgotPasswordText: {
    fontSize: 14, // Ajuste o tamanho da fonte conforme necessário
    color: '#5062a6',
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
    color: theme.colors.heading,
    fontSize: 15,
    textAlign: 'center',
    marginBottom: 64,
    fontFamily: theme.fonts.title500,
    lineHeight: 25
  }

});