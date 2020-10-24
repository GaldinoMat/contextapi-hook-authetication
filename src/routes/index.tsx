//Determines which route stack is going to be exhibited while the user navigates
import React from 'react';

import {useAuth} from '../context/auth';

import AppRoutes from './app.routes';
import AuthRoutes from './auth.routes';

const Routes: React.FC = () => {
  //gets the information from signed variable, from AuthContext
  const {signed, loading} = useAuth();

  //checks and defines which route shows up depending of context
  return signed ? <AppRoutes /> : <AuthRoutes />;
};

export default Routes;
