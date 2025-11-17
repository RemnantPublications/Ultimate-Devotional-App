/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, Image} from 'react-native';
import styles from './styles';
import Global from '../../Styles/Global';
import Images from '../../constants/Images';
import {AuthContext} from '../../Navigation/authProvider';
import {SocialSignInButton} from '../../Components/SocialSignInButton/SocialSignInButton';
import {onUserLogin} from '../../Navigation/firebaseFetchData';
import {useDispatch} from 'react-redux';
import Purchases from 'react-native-purchases';
import {AppleButton} from '@invertase/react-native-apple-authentication';
import {Platform} from 'react-native';

export const LoginScreen = ({navigation}) => {
  const {googleLogin, appleLogin, error, user} = React.useContext(AuthContext);
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (user) {
      navigation.navigate('HomeStack');
      onUserLogin(user, dispatch);

      const appUserID = user.uid;
      // Log in to RevenueCat using the custom App User ID
      Purchases.logIn(appUserID)
        .then(({customerInfo, created}) => {
          console.log('Customer Info:', customerInfo);
        })
        .catch(error => {
          console.error('RevenueCat logIn failed:', error);
        });
    }
  }, [navigation, user, dispatch]);

  return (
    <View style={Global.container}>
      <View style={styles.content}>
        <View style={styles.logoSection}>
          <Image source={Images.Logo} style={styles.logoImg} />
        </View>

        <View style={styles.title}>
          <Text style={styles.titleText}>Continue With</Text>
        </View>

        <View style={styles.signInSection}>
          <SocialSignInButton
            title="Sign in with Google"
            logo={Images.GoogleLogo}
            onPressAction={googleLogin}
            error={error}
          />
        </View>

        {/* Apple Sign-In Button */}
        <View style={styles.signInSection}>
          {Platform.OS === 'ios' && (
            <AppleButton
              buttonStyle={AppleButton.Style.BLACK}
              buttonType={AppleButton.Type.SIGN_IN}
              style={{
                width: 325,
                height: 55,
                marginTop: -150,
              }}
              onPress={appleLogin}
            />
          )}
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            By creating an account, you agree to Remnant Publications' Terms of
            Service, Privacy Policy, and Disclaimer
          </Text>
        </View>
      </View>
    </View>
  );
};
