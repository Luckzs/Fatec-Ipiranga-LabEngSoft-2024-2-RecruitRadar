import { StyleSheet } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';

import { theme } from '../../../global/styles/theme';

export const styles = StyleSheet.create({

  label: {
    color: theme.colors.primary,
    fontFamily: theme.fonts.text500,
    fontSize: 15,
    textAlign: 'left',
    fontWeight: 'bold'
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
    padding: 16,
    width: '100%',
    height: '100%',
    flex: 1,
    paddingTop: 40,
    alignItems: 'center'
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
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
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
    marginTop: "25%",
    marginBottom: "10%",
    alignItems: "flex-end",
    justifyContent: 'flex-start',

  },
  text1Email: {
    fontSize: 24,
    color: 'black',
    textAlign: "left",
    fontWeight: '800',
    fontFamily: 'Lora-Bold',

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
  textButtonSend: {
    color: 'white',
    width: '100%',
    fontSize: 22,
    textAlign: "center",
    fontFamily: 'Lora-Bold',
  },
});


