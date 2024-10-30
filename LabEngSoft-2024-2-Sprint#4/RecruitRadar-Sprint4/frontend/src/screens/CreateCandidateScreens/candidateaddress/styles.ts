import { StyleSheet } from 'react-native';
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
  content: {
    marginTop: 0,
    flex: 1,
    width: '100%',
    paddingHorizontal: 35,
  },
  text1ContainerForgot: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
    marginTop : 20,
    marginBottom: 40,
  },
  text1Forgot: {
    fontSize: 25,
    color: 'black',
    textAlign: 'left',
    fontWeight: '800',
    fontFamily: 'Lora-Bold',
  },
  titlePrimary: {
    fontFamily: 'Lora-Bold',
    fontWeight: '800',
    fontSize: 32,
    color: '#0262A6',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    height: 60,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: '10%',
    fontSize: 16,
    paddingHorizontal: 10,
    textAlign: 'center',
  },
label: {
    color: theme.colors.primary,
    fontFamily: theme.fonts.textLora,
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
    fontFamily: 'Lora-Bold',
    color: 'white',
    fontSize: 22,
    textAlign: 'center',
  },
  imageLogo: {
    marginTop: 0,
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
});