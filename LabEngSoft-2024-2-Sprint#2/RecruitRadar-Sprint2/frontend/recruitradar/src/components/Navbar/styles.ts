import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    navbar: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      paddingVertical: 10,
      backgroundColor: '#0262A6',
      position: 'absolute',
      bottom: 0,
      width: '100%',
    },
    navItem: {
      flex: 1,
      alignItems: 'center',
      padding:1,
    },
    icon: {
      width: 30,
      height: 30,
      alignItems:'center',
      justifyContent:'center',
      tintColor: 'white',    
    },
    headerTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: 'white',
    },
    textHome:{
      color:'white',
      fontSize:12,
    },
  });
  