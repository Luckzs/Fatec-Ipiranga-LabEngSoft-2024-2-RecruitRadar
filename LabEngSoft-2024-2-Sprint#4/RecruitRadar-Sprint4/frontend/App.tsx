import { StatusBar } from 'expo-status-bar';
import {
  useFonts,
  Nunito_300Light,
  Nunito_400Regular,
  Nunito_700Bold,
} from '@expo-google-fonts/nunito';
import { Routes } from './src/routes';
import React from 'react';
import  { AuthProvider } from './src/contexts/auth';
import { NavigationContainer } from '@react-navigation/native';
import * as Linking from 'expo-linking';

const linking = {
  prefixes: [Linking.createURL('/recruitradar')],
  config: {
    screens: {
      ResetPassword:{
        path : 'reset_password/:token',
      }
    }
  }
}


export default function App() {
  const [fontsLoaded] = useFonts({
    Nunito_300Light,
    Nunito_400Regular,
    Nunito_700Bold,

    'Lora-Regular': require('./src/assets/static/Lora-Regular.ttf'),
    'Lora-Bold': require('./src/assets/static/Lora-Bold.ttf'),
    'Lora-Italic': require('./src/assets/static/Lora-Italic.ttf'),
    'Lora-BoldItalic': require('./src/assets/static/Lora-BoldItalic.ttf'),

  });

  if (!fontsLoaded) {
    return null;
  }

  return (

    <>
      
        <StatusBar hidden />
        <AuthProvider>
        <NavigationContainer linking={linking}>
          <Routes />
        </NavigationContainer>
        </AuthProvider>

    </>
  )
}