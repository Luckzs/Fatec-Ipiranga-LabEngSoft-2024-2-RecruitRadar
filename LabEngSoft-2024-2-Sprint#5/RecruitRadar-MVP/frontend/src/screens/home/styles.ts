import { StyleSheet } from 'react-native';

import { theme } from '../../global/styles/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',    
  },
  image: {
    width: '100%',
    height: 360,    
  },
  imageLogo: {
   marginTop:20,
   marginBottom:30 
  },
  profileIcon: {
    position: 'absolute', // Permite que o ícone seja posicionado livremente
    top: 20, // Ajuste a posição conforme necessário
    right: 20, // Ajuste a posição conforme necessário
  },
  content: {    
    marginTop: -200,    
    paddingHorizontal: 50
  },
  title: {
    color: theme.colors.heading,
    textAlign: 'center',
    fontWeight:'bold',
    fontSize: 30,
    marginBottom: 16,   
    fontFamily: theme.fonts.title700,
    lineHeight: 40 
  },
  subtitle: {
    color: theme.colors.heading,
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 55,
    fontFamily: theme.fonts.title500,
    lineHeight: 25
  }
});