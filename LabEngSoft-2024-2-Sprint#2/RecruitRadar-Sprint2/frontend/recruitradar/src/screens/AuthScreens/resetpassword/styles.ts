import { StyleSheet } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';

import { theme } from '../../../global/styles/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
    justifyContent: 'center',
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