import React, { createContext, useState, useEffect } from "react";
import * as auth from "../services/auth";
import useAsyncStorage from "@react-native-async-storage/async-storage";
import api from "../services/api";
import { error } from "console";
import { Alert } from "react-native";

type Props = {
  children?: React.ReactNode;
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
  loading: boolean; // Estado para carregamento inicial
  isLoading: boolean; // Estado para carregamento durante ações (e.g. login)
  signOut(): void;
  signUp(name: string, email: string, password: string): Promise<void>;
  updateFirstTime(): void;
}

const authContext = createContext<authContextData>({} as authContextData);

export const AuthProvider: React.FC<Props> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [firstTime, setFirstTime] = useState(false);
  const [loading, setLoading] = useState(true); // Carregamento inicial
  const [isLoading, setIsLoading] = useState(false); // Ações específicas como login
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    async function loadStorageData() {
      try {
        setLoading(true);
        const storagedUser = await useAsyncStorage.getItem("@RRAuth:user");
        const storagedToken = await useAsyncStorage.getItem("@RRAuth:token");
        const storagedFirstTime = await useAsyncStorage.getItem(
          "@RRAuth:firstTime"
        );
        const storagedTime = await useAsyncStorage.getItem("@RRAuth:time");

        if (
          storagedUser &&
          storagedToken &&
          storagedFirstTime &&
          storagedTime
        ) {
          const storedDate = new Date(storagedTime);
          const currentDate = new Date();

          const diff = currentDate.getTime() - storedDate.getTime();
          const diffHours = Math.floor(diff / (1000 * 60 * 60));

          if (diffHours >= 24) {
            signOut();
            Alert.alert(
              "Sessão expirada",
              "Sua sessão expirou, faça login novamente."
            );
          }

          api.defaults.headers["Authorization"] = `Bearer ${storagedToken}`;
          setUser(JSON.parse(storagedUser));
          setFirstTime(JSON.parse(storagedFirstTime));
        }
      } catch (error) {
        console.error("Erro ao carregar dados do AsyncStorage", error);
      } finally {
        setLoading(false);
      }
    }

    loadStorageData();
  }, []);

  async function signIn(email: string, password: string) {
    setIsLoading(true); // Inicia o estado de carregamento para login
    setLoading(true); // Inicia o estado de carregamento para login
    try {
      const response = await auth
        .signIn(email, password)
        .then(async (response) => {
          setUser(response.user);

          api.defaults.headers["Authorization"] = `Bearer ${response.token}`;

          useAsyncStorage.setItem("@RRAuth:token", response.token);
          useAsyncStorage.setItem(
            "@RRAuth:user",
            JSON.stringify(response.user)
          );
          useAsyncStorage.setItem("@RRAuth:time", time.toISOString());

          const responseFirstTime = await auth.firstTime(email);
          setFirstTime(responseFirstTime);
          useAsyncStorage.setItem(
            "@RRAuth:firstTime",
            JSON.stringify(responseFirstTime)
          );

          const {token,user} = response;
          //console.log("Response:", response.user);
        })
        .catch((error) => {
          console.error("3Erro no login:", error);
          throw new Error(error);
        });
    } catch (error: any) {
      console.error("4Erro no login:", error.message);
      throw new Error(error);
    } finally {
      setIsLoading(false); // Inicia o estado de carregamento para login    }
      setLoading(false); // Finaliza o estado de carregamento para login
    }
  }

  async function signUp(name: string, email: string, password: string) {
    setIsLoading(true); // Estado de carregamento de ação específica
    //setLoading(true); // Estado de carregamento de ação específica
    try {
      await useAsyncStorage.getItem("@RRAuth:user").then((value) => {
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

      api.defaults.headers["Authorization"] = `Bearer ${response.token}`;

      await useAsyncStorage.setItem("@RRAuth:user", JSON.stringify({ email }));
      await useAsyncStorage.setItem("@RRAuth:token", response.token);

      const responseFirstTime = await auth.firstTime(email);
      setFirstTime(responseFirstTime);
      await useAsyncStorage.setItem(
        "@RRAuth:firstTime",
        JSON.stringify(responseFirstTime)
      );
    } catch (error: any) {
      console.error("Erro ao registrar:", error);
    } finally {
      setIsLoading(false); // Finaliza o estado de carregamento de registro
      //setLoading(false); // Finaliza o estado de carregamento de registro
    }
  }

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
    <authContext.Provider
      value={{
        signed: Boolean(user),
        firstTime,
        user,
        loading, // Para carregamento inicial
        isLoading, // Para ações específicas
        updateFirstTime,
        signIn,
        signOut,
        signUp,
      }}
    >
      {children}
    </authContext.Provider>
  );
};

export function useAuth() {
  const context = React.useContext(authContext);

  return context;
}