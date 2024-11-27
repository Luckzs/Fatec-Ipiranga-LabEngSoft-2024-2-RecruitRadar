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
  text1ContainerForgot:{
    flexDirection:"row",
    marginTop:"25%",
    alignItems:"flex-end",
    justifyContent: 'flex-start',
    
  },
  text1Forgot: {
    fontSize: 40,
    color: 'black',
    textAlign:"left",
    fontWeight:'800',
    fontFamily:'Lora-Bold',
  },
  text2ContainerForgot:{
    flexDirection:"row",
    alignItems:"center",
    justifyContent: 'flex-start',
    marginBottom:'10%'
  },
  text2Forgot:{
    fontSize: 40,
    color: 'black',
    textAlign:"center",
    fontWeight:'800',
    fontFamily:'Lora-Bold',
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
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
    paddingHorizontal: 10,
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
    fontFamily: 'Lora-Bold',
  },
  containerNotification: {
    marginTop: 10,
    paddingHorizontal: 20,
  },
  textNotification: {
    color: 'black',
    fontSize: 16,
    textAlign: "center",
    fontWeight: '400',
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
  refreshButtonContainer: {
    borderTopColor: '#E0E0E0',
    borderTopWidth: 1,
    paddingTop: 80,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
    width: '100%',
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