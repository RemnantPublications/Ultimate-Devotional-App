import React from 'react';
import {View, Text, Image} from 'react-native';

import styles from './styles';
import Global from '../../Styles/Global';
import Images from '../../constants/Images';
import {AuthContext} from '../../Navigation/authProvider';
import {SocialSignInButton} from '../../Components/SocialSignInButton/SocialSignInButton';

export const LoginScreen = ({navigation}) => {
  const {googleLogin, error, user} = React.useContext(AuthContext);

  const onPressHandler = () => {
    googleLogin();
  };

  React.useEffect(() => {
    if (user) {
      navigation.navigate('HomeStack');
    }
  }, [user]);

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
            onPressAction={onPressHandler}
            error={error}
          />
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            By creating an account, you agree to Remnant Publications' Terms of
            Service, Privacy Policy and Disclamer
          </Text>
        </View>
      </View>
    </View>
  );
};
