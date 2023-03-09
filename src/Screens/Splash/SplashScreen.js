import React from 'react';
import {View, Animated} from 'react-native';
import LottieView from 'lottie-react-native';
import Bootsplash from 'react-native-bootsplash';
import {CommonActions} from '@react-navigation/native';

import styles from './styles';
import {delay} from '../../utils/delayHelpers';
import Constants from '../../constants/Constants';
import {AuthContext} from '../../Navigation/authProvider';
import Logo_RP_animation from '../../images/Logo/Logo_RP_animation.json';

export const SplashScreen = ({navigation}) => {
  const {user} = React.useContext(AuthContext);
  const animatedValue = React.useRef(new Animated.Value(0.25)).current;

  // React.useLayoutEffect(() => {
  //   delay(() => Bootsplash.hide(), 500);
  // }, []);

  const screen = user ? 'HomeStack' : 'LoginScreen';

  const _routeToLogin = React.useCallback(() => {
    navigation.navigate(screen);
  }, [navigation, screen]);

  React.useLayoutEffect(() => {
    Bootsplash.hide({fade: true});
    Animated.timing(animatedValue, {
      toValue: Constants.animationInitialValue,
      duration: Constants.animationDuration,
      useNativeDriver: true,
    }).start(_routeToLogin);
  }, [_routeToLogin, animatedValue]);

  React.useEffect(() => {});

  return (
    <View style={styles.container}>
      <LottieView
        loop={false}
        source={Logo_RP_animation}
        progress={animatedValue}
      />
    </View>
  );
};
