//Authentication context
//gives value to app's context so specific information is displayed
import React, {createContext, useState, useEffect, useContext} from 'react';
import {StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import * as auth from '../services/auth';
import api from '../services/api';

interface User {
  name: string;
  email: string;
}

//determines context format
interface AuthContextData {
  signed: boolean;
  user: User | null;
  loading: boolean;
  signIn(): Promise<void>;
  signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

//sends everything sent to children parameter to provider's content
export const AuthProvider: React.FC = ({children}) => {
  //gets and returns user information
  //set to be initiated with an object or null
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  //stores the user information, launched as soon as we enter the screen and build the provider
  useEffect(() => {
    async function loadStoragedData() {
      const storagedUser = await AsyncStorage.getItem('@RNAuth:user');
      const storagedToken = await AsyncStorage.getItem('@RNAuth:token');

      if (storagedUser && storagedToken) {
        //gets token from stored session and use it on requests
        api.defaults.headers['Authorization'] = `Bearer ${storagedToken}`;

        setUser(JSON.parse(storagedUser));
        setLoading(false);
      }
    }

    loadStoragedData();
  }, []);

  //gets the response from request, checks the user's information and signs them in
  async function signIn() {
    const response = await auth.signIn();

    setUser(response.user);

    //gets user's token and use it in every request made by the user
    api.defaults.headers['Authorization'] = `Bearer ${response.token}`;

    //stores the user data to persistent login
    await AsyncStorage.setItem('@RNAuth:user', JSON.stringify(response.user));
    await AsyncStorage.setItem('@RNAuth:token', response.token);
  }

  //sets user to null, signing them off
  function signOut() {
    AsyncStorage.clear().then(() => {
      setUser(null);
    });
  }

  return (
    <AuthContext.Provider
      value={{signed: !!user, user, loading, signIn, signOut}}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);

  return context;
}
