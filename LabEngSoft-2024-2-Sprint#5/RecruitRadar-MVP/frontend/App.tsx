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
import { VacancyProvider } from './src/contexts/vacancy';
import { NavigationContainer } from '@react-navigation/native';
import * as Linking from 'expo-linking';
import { LogBox } from 'react-native';

const linking = {
  prefixes: [Linking.createURL('/recruitradar'),'recruitradar://',],
  config: {
    screens: {
      ResetPassword:{
        path : 'reset_password/:token',
      }
    }
  }
}

LogBox.ignoreAllLogs(true);
LogBox.ignoreLogs(['test']);

export default function App() {
  const [fontsLoaded] = useFonts({
    Nunito_300Light,
    Nunito_400Regular,
    Nunito_700Bold,
    'Lora-SemiBold': require('./src/assets/static/Lora-SemiBold.ttf'),
    'Lora-Regular': require('./src/assets/static/Lora-Regular.ttf'),
    'Lora-Bold': require('./src/assets/static/Lora-Bold.ttf'),
    'Lora-Italic': require('./src/assets/static/Lora-Italic.ttf'),
    'Lora-BoldItalic': require('./src/assets/static/Lora-BoldItalic.ttf'),
    'Montserrat-SemiBold': require('./src/assets/static/Montserrat-SemiBold.ttf'),
    'Montserrat-Regular': require('./src/assets/static/Montserrat-Regular.ttf'),
    'Montserrat-Bold': require('./src/assets/static/Montserrat-Bold.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (

    <>
      
        <StatusBar hidden />
        <AuthProvider>
        <VacancyProvider>
        <NavigationContainer linking={linking}>
          <Routes />
        </NavigationContainer>
        </VacancyProvider>
        </AuthProvider>

    </>
  )
}