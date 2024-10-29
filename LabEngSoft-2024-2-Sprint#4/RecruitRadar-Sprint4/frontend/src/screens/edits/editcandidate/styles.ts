import { StyleSheet } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';
import { theme } from '../../../global/styles/theme';


export const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 360,
  },
  container: {
    backgroundColor: theme.colors.white,
    width: '100%',
    flex  : 1,
  },
  label: {
    color: theme.colors.primary,
    fontFamily: theme.fonts.text500,
    fontSize: 15,
    textAlign: 'left',
    fontWeight: 'bold'
  },
  input: {
    color: '#333333',
    fontFamily: theme.fonts.text400,
    fontSize: 16,
    width: '90%',
    borderBottomColor: theme.colors.primary,
    borderBottomWidth: 2,
    marginBottom: 10,
    marginTop: 10,
    marginLeft: 10,
  },
  content: {
    flex: 1, // Faz com que o View ocupe o máximo de espaço disponível
    justifyContent: 'center', // Centraliza verticalmente
    alignItems: 'center', // Centraliza horizontalmente
    width: '100%', // Garante que o View ocupe toda a largura
    paddingHorizontal: 35,
    padding: 20,
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
    color: '#0057a3',
    textAlign: 'center',
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 5,
    fontFamily: theme.fonts.title700,
    lineHeight: 40
  },
  imageLogo: {
    marginTop: 0,
    marginBottom: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,  
  },
  imageLine: {
    marginLeft: 'auto', // Empurra o ícone para o final da linha
  },
  linha: {
    marginTop: 15,
    marginBottom: 15
  },
  subtitle: {
    color: '#333333',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    fontFamily: theme.fonts.title500,
  },
  preferencesubtitle: {
    color: '#0057a3',
    fontSize: 21,
    textAlign: 'left',
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    fontFamily: theme.fonts.title500,
  },
  studyList: {
    marginTop: 20,
    width: '100%',
  },
  studyItem: {
    padding: 15,
    backgroundColor: theme.colors.cardBackground,
    borderRadius: 8,
    marginBottom: 10,
  },
  studyText: {
    fontSize: 16,
    color: '#333333',
    marginBottom: 5,
    fontFamily: theme.fonts.text400,
  },
  text: {
    fontSize: 16,
    color: '#333333',
    marginLeft: 10,
    fontFamily: theme.fonts.text400,
  },
  sliderContainer: {
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
  },
  slider: {
    width: '90%',
    height: 40,
  }, dateText: {
    fontSize: 16,
    color: '#888888',
  },
  dateInput: {
    borderColor: theme.colors.text,
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginVertical: 10,
    alignItems: 'center',
    backgroundColor: theme.colors.white,
  },
  removeButton: {
    color: theme.colors.primary,
    fontFamily: theme.fonts.text500,
    fontSize: 14,
    textAlign: 'right',
    marginTop: 5,
    textDecorationLine: 'underline',
    fontWeight: 'bold',
  },
  addStudyButton: {
    paddingVertical: 12, // Espaçamento vertical interno
    borderRadius: 8, // Bordas arredondadas
    alignItems: 'center', // Centraliza o texto no botão
    marginTop: 20, // Espaçamento superior
    width: '100%', // Largura total do container
  },
  saveStudyButton: {
    paddingVertical: 12, // Espaçamento vertical interno
    borderRadius: 8, // Bordas arredondadas
    alignItems: 'center', // Centraliza o texto no botão
    marginTop: 10, // Espaçamento superior
    width: '100%', // Largura total do container
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    width: '100%',
    marginBottom: 20,
  },
  section: {
    width: '100%',
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    paddingBottom: 10,
  },
  pereferencessection: {
    width: '100%',
    borderBottomColor: '#E0E0E0',
  },
  positionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    borderRadius: 8,
  },
  readpositionItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: theme.colors.cardBackground,
    borderRadius: 8,
    justifyContent: 'flex-start', // Espaça os itens entre si
    marginVertical: 5, // Margem vertical para espaçamento
  },


  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    width: '90%',
  },
  button: {
    backgroundColor: 'white',
    borderColor: 'blue',
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 5,
    width: '45%',
    alignItems: 'center',
    alignSelf: 'flex-end',
  },
  buttonText: {
    color: 'blue',
    fontSize: 16,
    fontWeight: 'bold',
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 10,
  },
  preferencesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  editButton: {
    padding: 8,
  },
});