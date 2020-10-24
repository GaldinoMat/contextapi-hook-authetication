import 'react-native-gesture-handler';

import React from 'react';
import {View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {AuthProvider} from './context/auth';

import Routes from './routes/index';

const App: React.FC = () => {
  return (
    /*
      Provides information/access to information contained in context provider 
      for all components encapsuled
    */
    <NavigationContainer>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </NavigationContainer>
  );
};

export default App;
