/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect} from 'react';
import {Provider} from 'react-redux';
import {SafeAreaView, StatusBar, Platform} from 'react-native';
import {PersistGate} from 'redux-persist/integration/react';
import Purchases from 'react-native-purchases';

import Colors from './src/Styles/Colors';
import {AppNavigation} from './src/Navigation';
import {ThemeProvider} from './src/theme/ThemeProvider';
import store, {persistor} from './src/Redux/store/store';

const App = () => {
  useEffect(() => {
    Purchases.setLogLevel(Purchases.LOG_LEVEL.DEBUG); // Enable debug logging

    const initializeRevenueCat = async () => {
      try {
        if (Platform.OS === 'ios') {
          await Purchases.configure({
            apiKey: 'appl_DIPDBBwadWzsnUpndaZsyYFtfxC',
          });
        } else if (Platform.OS === 'android') {
          await Purchases.configure({
            apiKey: 'goog_XQCSqcOONrwISloSjjueyoteFpJ',
          });
        }

        // Fetch customer info to confirm connection
        const customerInfo = await Purchases.getCustomerInfo();
        console.log('✅ Successfully connected to RevenueCat:', customerInfo);
        Purchases.getOfferings().then(console.log);
      } catch (error) {
        console.error('❌ RevenueCat initialization failed:', error);
      }
    };

    initializeRevenueCat();
  }, []);
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider>
          <SafeAreaView style={{backgroundColor: Colors.themeBlue, flex: 0}} />
          <StatusBar
            backgroundColor={Colors.themeBlue}
            barStyle="light-content"
          />

          <AppNavigation />
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
