import { StyleSheet } from "react-native";
import * as Font from 'expo-font';

export const styles = StyleSheet.create({
  body: {
    flex: 1, // Expande o contêiner para ocupar toda a tela
    fontFamily: 'Lora-Regular',
    backgroundColor: '#FFFFFF',
    justifyContent: 'center', // Centraliza verticalmente
    alignItems: 'center', // Centraliza horizontalmente
    padding: 0,
  },
  titlePrimaryContainer: {
    flexDirection: "row",
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20, // Ajusta o espaçamento inferior
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
  sloganContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20, // Ajusta o espaçamento vertical
  },
  slogan: {
    fontSize: 20,
    color: '#1BB8FA',
    textAlign: 'center',
  },
  sliderIndicators: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 20,
  },
  dot: {
    width: 10,
    height: 10,
    backgroundColor: '#DADADA',
    borderRadius: 50,
    marginHorizontal: 5,
  },
  dotActive: {
    backgroundColor: '#737380',
  },
  terms: {
    fontSize: 12,
    color: '#777',
    textAlign: 'center',
    paddingHorizontal: 20,
    marginVertical: 20,
  },
  link: {
    color: '#007BFF',
    textDecorationLine: 'underline',
  },
  containerButtonPrimary: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginTop: 20,
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
    color: 'white',
    fontSize: 22,
    textAlign: 'center',
  },
});
