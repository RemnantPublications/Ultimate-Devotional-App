import React from 'react';
import {AuthContext} from '../../Navigation/authProvider';
import {View, Text, Image, TouchableOpacity} from 'react-native';

import styles from './styles';

export const SocialSignInButton = ({title, logo, error, onPressAction}) => {
  const {setError} = React.useContext(AuthContext);
  return (
    <View>
      <TouchableOpacity
        style={styles.content}
        onPress={() => {
          return setError(''), onPressAction();
        }}>
        <View style={styles.socialLogo}>
          <Image source={logo} style={styles.logoImg} />
        </View>
        <View style={styles.signInTextSection}>
          <Text style={styles.signInText}>{title}</Text>
        </View>
      </TouchableOpacity>

      {!!error && (
        <View style={styles.errorSection}>
          <Text style={styles.errorText}>Login Failed. Please try again</Text>
        </View>
      )}
    </View>
  );
};
