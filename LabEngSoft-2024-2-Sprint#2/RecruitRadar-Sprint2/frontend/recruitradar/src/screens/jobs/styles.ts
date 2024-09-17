import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({
  container: {
    flex: 1,
      backgroundColor: '#fff',
      paddingVertical: 40,
  },
  header: {
    width: '100%',
    height: 50,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    
  },
  profile: {
    width: 37,
    height: 39,
    tintColor:'#0262A6'
  },
  cardCompanyImage:{
    flexDirection:'row',
    
  },
  profileIcon: {
    position: 'absolute', // Permite que o ícone seja posicionado livremente
   
    right: 20, // Ajuste a posição conforme necessário
  },
  logoutIcon: {
    position: 'absolute',
    top: 0,
    left: 20,
  },
  imageLogo: {
    marginTop: 0,
    marginBottom: 15
  },
  companyImage:{
    width: 36,
    height: 36,
    borderRadius:2,
    marginRight:10,
    tintColor:'#FF1493'
  },
  cardImageUser:{
    flexDirection:'row',
  },
  imageUser:{
    width: 26,
    height: 26,
    borderRadius:8,
    marginRight:10,
  },
  cardcontainer:{
    
    width: '100%', 
    height:'auto',
    justifyContent:'center',
    alignItems:'center',
    flexDirection:'column',
    marginLeft:-8,
    padding: 10,
    marginHorizontal: 30,
    marginVertical: '20%',
    maxWidth: 3000,
    maxHeight: 3000,
  },
  card: {
     backgroundColor: '#1BB8FA',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    width:320,
    height:380, 
    padding: 20,
    marginHorizontal: 10,
    marginVertical: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 50,
  },
  companyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  companyName: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'regular',
  },
  location: {
    fontSize: 16,
    color: 'white',
    marginVertical: 15,
  },
  matchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  matchIcon: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginRight: 10,
  },
  matchMessage: {
    fontSize: 16,
    color: 'white',
  },
  datePosted: {
    fontSize: 14,
    color: 'white',
  },
  detailsLink: {
    color: 'white',
    fontWeight: 'bold',
    marginTop: 20,
    fontSize:18,
    textDecorationLine:'underline',
    textAlign: 'right',
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems:'center',
    paddingVertical: 10,
    backgroundColor: '#007bff',
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    padding:1,
  },
  navItemContent: {
    alignItems: 'center', // Centraliza o conteúdo (ícone + texto)
    justifyContent: 'center',
  },
  icon: {
    width: 30,
    height: 30,
    alignItems:'center',
    justifyContent:'center',
    tintColor: '#fff',
  },
  containerLike:{
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems:'center',
    paddingVertical: 10,
    marginTop:-80
    
  },
  like:{
    width:60,
    height:60,
    tintColor: 'green',
  },
  dislike:{
    width:60,
    height:60,
    tintColor: 'red',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#007bff',
  },
  textHome:{
    color:'white',
    fontSize:12,
  },
  modalContainer: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.1)', // Fundo semitransparente para destacar o modal
  },
  modalContent: {
    width: '90%', // Aumenta a largura para ocupar 90% da tela
    height: '80%', // Aumenta a altura para 80% da tela
    backgroundColor: '#1BB8FA', 
    borderRadius: 10,
    padding: 20,
    justifyContent: 'space-between', // Distribui o conteúdo
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    color:'white'
  },
  companyInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    color:'black'
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    color:'white'
  },
  modalDescription: {
    fontSize: 16,
    lineHeight: 22,
    color:'white'
  },
  companyLogo: {
    width: 50,
    height: 50,
    marginRight: 10,
    tintColor:'white'
  },
  backIcon: {
    width: 24,
    height: 24,
    color:'black'
  },
 
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color:'white'
  },
  
  sidebar: {
    width: '70%', // 70% da largura da tela
    height: '100%',
    backgroundColor: '#fff',
    padding: 20,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  closeSidebar: {
    alignSelf: 'flex-end',
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  profileSection: {
    alignItems: 'center',
    marginVertical: 20,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  menuItem: {
    fontSize: 16,
    color: '#007bff',
    paddingVertical: 10,
  },
 
  
});