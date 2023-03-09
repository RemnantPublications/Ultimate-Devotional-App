import React from 'react';
import auth from '@react-native-firebase/auth';
import {ActivityIndicator} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

import Global from '../Styles/Global';
import {AuthContext} from './authProvider';
import {HomeStack} from './home.navigation';
import {LoginScreen} from '../Screens/Login/login';
import {SplashScreen} from '../Screens/Splash/SplashScreen';
import {googleClientId} from '../constants/googleClientId';

const Root = createStackNavigator();

export const Routes = () => {
  const [initializing, setInitializing] = React.useState(true);
  const {setUser} = React.useContext(AuthContext);
  const [authenticated, setAuthenticated] = React.useState(false);

  React.useEffect(() => {
    GoogleSignin.configure({
      webClientId: googleClientId,
    });

    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, [onAuthStateChanged]);

  const onAuthStateChanged = React.useCallback(
    user => {
      setUser(user);
      if (initializing) {
        setInitializing(false);
      }
      if (user) {
        setAuthenticated(true);
      } else {
        setAuthenticated(false);
      }
    },
    [initializing, setUser],
  );

  if (initializing) {
    return <ActivityIndicator size="small" style={Global.container} />;
  }

  return (
    <NavigationContainer>
      <Root.Navigator
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
          headerBackTitle: '',
        }}>
        <Root.Screen name="SplashScreen" component={SplashScreen} />
        <Root.Screen name="HomeStack" component={HomeStack} />
        <Root.Screen name="LoginScreen" component={LoginScreen} />
      </Root.Navigator>
    </NavigationContainer>
  );
};
