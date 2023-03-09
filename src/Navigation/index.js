import React from 'react';

import {Routes} from './routes';
import {AuthProvider} from './authProvider';

export const AppNavigation = () => {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
};
