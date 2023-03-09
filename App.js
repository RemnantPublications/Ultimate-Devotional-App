/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {Provider} from 'react-redux';
import {SafeAreaView, StatusBar} from 'react-native';
import {AppearanceProvider} from 'react-native-appearance';
import {PersistGate} from 'redux-persist/integration/react';

import Colors from './src/Styles/Colors';
import {AppNavigation} from './src/Navigation';
import {ThemeProvider} from './src/theme/ThemeProvider';
import store, {persistor} from './src/Redux/store/store';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppearanceProvider>
          <ThemeProvider>
            <SafeAreaView
              style={{backgroundColor: Colors.themeBlue, flex: 0}}
            />
            <StatusBar
              backgroundColor={Colors.themeBlue}
              barStyle="light-content"
            />

            <AppNavigation />
          </ThemeProvider>
        </AppearanceProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
