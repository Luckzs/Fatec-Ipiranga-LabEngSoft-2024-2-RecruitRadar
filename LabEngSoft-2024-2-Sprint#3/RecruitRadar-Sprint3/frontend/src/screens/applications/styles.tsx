import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  
  container: {
    flex: 1,  // Certifica-se de que a view ocupa todo o espaço disponível
    backgroundColor: '#f5f5f5', // Exemplo de cor de fundo
    width: '100%',
    paddingBottom: 60
  },
  

  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#0262A6',
    textAlign: 'center',
    marginVertical: 60,
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    height: 40,
    
  },
  
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    marginHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#0262A6',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  companyLogo: {
    width: 50,
    height: 50,
    marginRight: 10,
    resizeMode: "contain" 
  },
  info: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#18BCDC',
  },
  companyName: {
    fontSize: 16,
    color: '#888',
  },
  dateApplied: {
    fontSize: 14,
    color: '#aaa',
  },
});