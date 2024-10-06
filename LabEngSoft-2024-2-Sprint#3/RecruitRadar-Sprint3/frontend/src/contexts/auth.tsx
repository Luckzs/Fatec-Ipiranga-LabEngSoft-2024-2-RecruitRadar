import React, { createContext, useState, useEffect } from 'react';
import * as auth from '../services/auth';
import useAsyncStorage from '@react-native-async-storage/async-storage';
import api from '../services/api';
import { error } from 'console';
import { Alert } from 'react-native';

type Props = {
  children?: React.ReactNode
};

interface User {
  //name: string;
  email: string;
}

interface authContextData {
  signed: boolean;
  firstTime: boolean;
  signIn(email: string, password: string): Promise<void>;
  user: User | null;
  loading: boolean;
  signOut(): void;
  signUp(name: string, email: string, password: string): Promise<void>;
  updateFirstTime(): void;
}

const authContext = createContext<authContextData>({} as authContextData);

export const AuthProvider: React.FC<Props> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [firstTime, setFirstTime] = useState(false);
  const [loading, setLoading] = useState(true);
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    async function loadStorageData() {
      const storagedUser = await useAsyncStorage.getItem('@RRAuth:user');
      const storagedToken = await useAsyncStorage.getItem('@RRAuth:token');
      const storagedFirstTime = await useAsyncStorage.getItem('@RRAuth:firstTime');
      const storagedTime = await useAsyncStorage.getItem('@RRAuth:time');

      if (storagedUser && storagedToken && storagedFirstTime && storagedTime) {

        const storedDate = new Date(storagedTime);
        const currentDate = new Date();

        const diff = currentDate.getTime() - storedDate.getTime();
        const diffHours = Math.floor(diff / (1000 * 60 * 60));

        if (diffHours >= 24) {
          signOut();
          Alert.alert('Sessão expirada', 'Sua sessão expirou, faça login novamente.');
        }

        api.defaults.headers['Authorization'] = `Bearer ${storagedToken}`
        setUser(JSON.parse(storagedUser));
        setFirstTime(JSON.parse(storagedFirstTime));
      }
      setLoading(false);
    }

    loadStorageData();
  }, []);

  async function signIn(email: string, password: string) {

    const response = await auth.signIn(email, password).then(async (response) => {

      setUser(response.user);

      api.defaults.headers['Authorization'] = `Bearer ${response.token}`;

      useAsyncStorage.setItem('@RRAuth:token', response.token);
      useAsyncStorage.setItem('@RRAuth:user', JSON.stringify(response.user));
      useAsyncStorage.setItem('@RRAuth:time', time.toISOString());

      const responseFirstTime = await auth.firstTime(email);
      setFirstTime(responseFirstTime);
      useAsyncStorage.setItem('@RRAuth:firstTime', JSON.stringify(responseFirstTime));


      //const {token,user} = response;
      console.log('Response:', response.user);
    }).catch((error) => {
      console.error('Erro no login:', error);
      throw new Error(error);
    });
  }

  async function signUp(name: string, email: string, password: string) {

    await useAsyncStorage.getItem('@RRAuth:user').then((value) => {
      if (value) {
        const user = JSON.parse(value);
        if (user.email === email) {
          console.log(user.email);
          throw new Error("Já existe uma conta com este E-mail");
        }
      }
    });

    const response = await auth.signUp(name, email, password);

    setUser(response.user);
    console.log('Response:', response);

    api.defaults.headers['Authorization'] = `Bearer ${response.token}`;

    await useAsyncStorage.setItem('@RRAuth:user', JSON.stringify({ email }));
    await useAsyncStorage.setItem('@RRAuth:token', response.token);

    const responseFirstTime = await auth.firstTime(email);
    setFirstTime(responseFirstTime);
    await useAsyncStorage.setItem('@RRAuth:firstTime', JSON.stringify(responseFirstTime));

    console.log('Response:', response);
  };

  function signOut() {
    useAsyncStorage.clear().then(() => {
      setUser(null);
      setFirstTime(true);
    });
  }

  const updateFirstTime = () => {
    setFirstTime(false); // Atualiza para false quando o candidato é cadastrado
  };

  return (
    <authContext.Provider value={{ signed: Boolean(user), firstTime, user, loading, updateFirstTime, signIn, signOut, signUp }}>
      {children}
    </authContext.Provider>
  )
}

export function useAuth() {
  const context = React.useContext(authContext);

  return context;
}
