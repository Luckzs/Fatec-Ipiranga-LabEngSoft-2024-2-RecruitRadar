import { StyleSheet } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';
import { theme } from '../../../global/styles/theme';


export const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 360,
  },
  container: {
    fontFamily: 'Lora-Bold',
    backgroundColor: '#FFFFFF',
    width: '100%',
    height: '100%',
    flex: 1,
    alignItems: 'center',
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
    width: '88%',
    marginBottom: 10,
    marginTop: 10,
    marginLeft: 10,
  },
  content: {
    flex: 1, // Faz com que o View ocupe o máximo de espaço disponível
    width: '100%', // Garante que o View ocupe toda a largura
    paddingHorizontal: 35,
  },
  titlePrimaryContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    
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
    color: '#0262A6',
    textAlign: 'center',
    fontSize: 22,
    fontFamily: 'Montserrat-SemiBold',
  },
  title2: {
    color: theme.colors.text,
    textAlign: "center",
    fontSize: 25,
    fontWeight: "bold",
    fontFamily: 'Montserrat-SemiBold',
    alignSelf: "center",
  },
  imageLogo: {
    width: 90,
    height: 90,
    textAlignVertical: 'top',
  },
  imageLogo1: {
    width: 90,
    height: 90,
    marginTop: 0,
    marginBottom: 15,
    textAlign: 'center',
    justifyContent  : 'center',
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
  },  loadingContainer: {
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
  scrollview:{
    fontFamily: 'Lora-Bold',
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
    paddingHorizontal: 20,
    height: 50,
  },
  header1: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginTop: 40,
    height: 50,
  },
  backIcon: {
    width: 24,
    height: 24,
    tintColor: '#FFFFFF', // white color for the icon itself
  },
  backiconContainer: {
    width: 30,
    height: 30,
    borderRadius: 20,
    alignItems: 'center',
    backgroundColor: '#0262A6',
    justifyContent: 'center',
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
    alignItems: 'center',
    backgroundColor: theme.colors.cardBackground,
    borderRadius: 8,
    justifyContent: 'flex-start', // Espaça os itens entre si
    marginVertical: 5, // Margem vertical para espaçamento
    height: 45, // Altura do container
  },
  readpositionItem1: {
    flexDirection: 'row',
    backgroundColor: theme.colors.cardBackground,
    borderRadius: 8,
    justifyContent: 'flex-start', // Espaça os itens entre si
    alignContent: 'center',
    textAlign: 'center',
    height: 45, // Altura do container
  },
  passwordContainer: {
    flexDirection: 'row', // Coloca o texto e o ícone na mesma linha
    alignItems: 'center', // Centraliza o conteúdo verticalmente
    width: '100%', // 80% do espaço disponível
    height: 45, // Altura do campo
    backgroundColor: theme.colors.cardBackground,
    borderRadius: 8,
    marginTop: '2%',
    marginBottom: '2%',
  },
  positionContainer: {
    flexDirection: 'row', // Coloca o texto e o ícone na mesma linha
    alignItems: 'center', // Centraliza o conteúdo verticalmente
    width: '100%', // 80% do espaço disponível
    height: 45, // Altura do campo
    
    marginTop: '3%',
    marginBottom: '5%',
    borderColor: '#737380C2',
    borderWidth: 1,
    borderRadius: 12,
  },
  positionContainer2: {
    flexDirection: 'row', // Coloca o texto e o ícone na mesma linha
    alignItems: 'center', // Centraliza o conteúdo verticalmente
    width: '100%', // 80% do espaço disponível
    height: 85, // Altura do campo
    marginTop: '3%',
    marginBottom: '5%',
    borderColor: '#737380C2',
    borderWidth: 1,
    borderRadius: 12,
  },
  iconContainer: {
    width: 30,
    height: 30,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    textAlign: 'center',
    textAlignVertical: 'center',
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

  addbuttonPrimary: {
    marginTop: '3%',
    marginBottom: '10%',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingVertical: 12,
    alignItems: 'center',
    alignSelf: 'flex-end',
    width: '50%',
    borderWidth: 1,
    borderColor: '#0262A6',
  },
  addtextbuttonPrimary: {
    color: '#0262A6',
    fontSize: 18,
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