import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Colors from '@styles/Colors';
import {StackScreens} from '@constants/Constants';

export const EmptyRead = () => {
  const navigation = useNavigation();

  const subscribeHandler = () => {
    navigation.navigate(StackScreens.PaywallScreen);
  };

  const claimCouponHandler = () => {
    navigation.navigate(StackScreens.CouponScreen);
  };
  return (
    <View style={styles.container}>
      <Icon name="lock-outline" size={60} color={Colors.gray800} />
      <View style={styles.description}>
        <Text style={styles.title}>Content Locked</Text>
        <Text style={styles.info}>
          <Text style={styles.blueText} onPress={subscribeHandler}>
            Subscribe
          </Text>{' '}
          or{' '}
          <Text style={styles.blueText} onPress={claimCouponHandler}>
            Claim a coupon
          </Text>{' '}
          to unlock all the contents.{' '}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.white,
  },
  description: {
    margin: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontFamily: 'GothamMedium',
    textTransform: 'uppercase',
    color: Colors.themeBlue,
  },
  info: {
    margin: 20,
    textAlign: 'center',
  },
  blueText: {
    color: Colors.themeBlue,
    textDecorationLine: 'underline',
  },
});
