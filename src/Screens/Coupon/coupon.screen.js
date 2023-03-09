import React from 'react';
import moment from 'moment';
import firestore from '@react-native-firebase/firestore';
import {
  View,
  Text,
  Image,
  Platform,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';

import Colors from '@styles/Colors';
import Images from '@constants/Images';
import {AuthContext} from '@navigation/authProvider';
import {CouponInfoModal} from './component/CouponInfoModal';

export const CouponScreen = () => {
  const [couponValue, setCouponValue] = React.useState();
  const [couponErrorModal, setCouponErrorModal] = React.useState(false);
  const [modalDescription, setModalDescription] = React.useState('');
  const [couponClaimSuccess, setCouponCLaimSuccess] = React.useState(false);

  const {user} = React.useContext(AuthContext);

  const onChangeText = val => {
    setCouponValue(val);
  };

  // Note: Claim coupon handler
  const claimCoupon = async () => {
    const couponDocument = await firestore()
      .collection('coupons')
      .doc(couponValue)
      .get();

    const userActiveCoupon = await firestore()
      .collection('users')
      .doc(user.email)
      .get();

    // Note: check if user have a coupon active
    if (userActiveCoupon?._data?.activeCoupon === true) {
      setModalDescription('Already have a coupon active.');
      setCouponErrorModal(true);
      setCouponCLaimSuccess(true);

      return;
    }

    // Note: check if entered code is valid || found in firestore
    if (couponDocument._data === undefined) {
      setModalDescription('Invalid Coupon code. Please try again.');
      setCouponErrorModal(true);
    } else if (couponDocument._data.claimed === true) {
      // Note: Check if coupon is available
      setModalDescription(
        'Coupon already claimed. Please try different coupon.',
      );
      setCouponErrorModal(true);
    } else {
      // Note: Claim coupon
      const couponType = couponDocument._data.coupon_type;
      const counponDuration = couponDocument._data.coupon_duration;
      const couponExpire = moment(new Date()).add(
        `${counponDuration}`,
        `${couponType}`,
      );

      await firestore().collection('coupons').doc(couponValue).update({
        claimed: true,
        claimedBy: user.email,
      });

      if (userActiveCoupon._data === undefined) {
        await firestore()
          .collection('users')
          .doc(user.email)
          .set({
            user: user.email,
            activeCoupon: true,
            couponType: couponType,
            couponClaimedDate: new Date(),
            couponExpireDate: new Date(couponExpire),
          });
      } else if (
        userActiveCoupon._data &&
        !userActiveCoupon._data.activeCoupon
      ) {
        await firestore().collection('users').doc(user.email).update({
          activeCoupon: true,
          couponType: couponType,
          couponClaimedDate: new Date(),
          couponExpireDate: couponExpire._d,
        });
      }

      setModalDescription('Coupon successfully claimed.');
      setCouponCLaimSuccess(true);
      setCouponErrorModal(true);
    }
  };

  const closeErrorModal = () => {
    setCouponErrorModal(false);
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        style={styles.coupon}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={styles.logo}>
          <Image source={Images.Logo} style={styles.logoImg} />
        </View>
        <View style={styles.flex}>
          <Text style={styles.descriptionText}>What's this ?</Text>
          <Text style={styles.descriptionText}>
            Claim a coupon code and get the contents of Ultimate Devotional for
            free.
          </Text>
        </View>

        <View style={styles.couponActions}>
          <Text style={styles.gothamFont}>Coupon Code</Text>
          <TextInput
            maxLength={9}
            textAlign={'center'}
            placeholder="XXXX-XXXX"
            style={styles.couponCodeInput}
            onChangeText={onChangeText}
          />
          <TouchableOpacity
            onPress={claimCoupon}
            style={styles.claimCouponButton}>
            <Text style={styles.gothamFont}>Claim</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>

      <CouponInfoModal
        modalVisible={couponErrorModal}
        closeModal={closeErrorModal}
        description={modalDescription}
        success={couponClaimSuccess}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  gothamFont: {
    fontFamily: 'GothamMedium',
  },
  container: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 16,
    backgroundColor: Colors.white,
  },
  coupon: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 20,
    paddingVertical: 37,
    paddingHorizontal: 16,
  },
  descriptionText: {
    marginTop: 20,
    lineHeight: 16,
    fontFamily: 'GothamMedium',
  },
  couponActions: {
    flex: 1.5,
    alignItems: 'center',
  },
  couponCodeInput: {
    padding: 15,
    width: '100%',
    marginTop: 10,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'grey',
    alignItems: 'center',
  },
  claimCouponButton: {
    width: '50%',
    marginTop: 30,
    borderRadius: 5,
    paddingVertical: 16,
    alignItems: 'center',
    backgroundColor: Colors.gray300,
  },
  logo: {
    borderRadius: 10,
    marginBottom: 20,
    alignSelf: 'center',
    backgroundColor: Colors.themeBlue,
  },
  logoImg: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
});
