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
    iconContainer: {
      position: 'relative',
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
    newApplicationIndicator: {
      position: 'absolute',
      right: -5,
      top: -5,
      height: 10,
      width: 10,
      backgroundColor: 'red',
      borderRadius: 5,
    },
    
  });
  