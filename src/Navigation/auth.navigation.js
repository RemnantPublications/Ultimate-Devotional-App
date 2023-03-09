import React from 'react';
import 'react-native-gesture-handler';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';

import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';

import {LoginScreen} from '../Screens/Login/login';
import {googleClientId} from '../constants/googleClientId';
import {SplashScreen} from '../Screens/Splash/SplashScreen';

const Stack = createStackNavigator();

export const AuthStack = () => {
  React.useEffect(() => {
    GoogleSignin.configure({
      webClientId: googleClientId,
    });
  }, []);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: false,
        transitionSpec: {
          open: {
            config: {
              speed: 10,
            },
          },
          close: {
            config: {
              speed: 10,
            },
          },
        },
      }}>
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{
          ...TransitionPresets.ScaleFromCenterAndroid,
        }}
      />
    </Stack.Navigator>
  );
};
