import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Start } from '../screens/AuthScreens/start';
import { SignIn } from '../screens/AuthScreens/signin';
import { ForgotPassword } from '../screens/AuthScreens/forgotpassword';
import { ResetPassword } from '../screens/AuthScreens/resetpassword';
import { CreateUser } from '../screens/AuthScreens/signup';

export type MainStack = {
  Start: undefined;
  SignIn: { user: string };
  ForgotPassword : undefined;
  ResetPassword : undefined;
  CreateUser: undefined;
}
  const authStack = createStackNavigator<MainStack>();

   const AuthRoutes = () => {
    return (
      <authStack.Navigator screenOptions={{ headerShown: false }} >
        <authStack.Screen name="Start" component={Start} />
        <authStack.Screen name="SignIn" component={SignIn} />
        <authStack.Screen name='ForgotPassword' component={ForgotPassword} />
        <authStack.Screen name='ResetPassword' component={ResetPassword} />
        <authStack.Screen name='CreateUser' component={CreateUser} />
      </authStack.Navigator>
    );
  }
  export default AuthRoutes;