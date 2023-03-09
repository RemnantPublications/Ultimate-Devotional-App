import React from 'react';
import IAP from 'react-native-iap';
import {useDispatch, useSelector} from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import {useFocusEffect} from '@react-navigation/native';
import {
  View,
  Image,
  Platform,
  Pressable,
  StatusBar,
  ScrollView,
} from 'react-native';

import {styles} from './styles';
import Global from '@styles/Global';
import Colors from '@styles/Colors';
import {useTheme} from '@theme/ThemeProvider';
import {couponExpired} from '@actions/action';
import {AuthContext} from '@navigation/authProvider';
import {CalendarUtil} from '@constants/CalendarUtil';
import {bookDataHandler} from '@utils/bookDataHandler';
import {StackScreens, Title} from '@constants/Constants';
import {isSubscribed, isCouponActive} from '@actions/action';
import {BookList} from '@components/Library/BookList/BookList';
import {validReceiptPassword} from '../../constants/Constants';
import {CouponInfoModal} from '../Coupon/component/CouponInfoModal';
import {TitleBanner} from '@components/Library/TitleBanner/TitleBanner';
import {LibraryBooksData, EGWhiteData} from '@constants/LibraryBooksData';

const currentYearBooks = LibraryBooksData.filter(
  item => item.date === CalendarUtil.currentYear,
);

const previousYearBooks = LibraryBooksData.filter(
  item => item.date !== CalendarUtil.currentYear,
);

export const LibraryScreen = ({navigation}) => {
  const {user} = React.useContext(AuthContext);
  const dispatch = useDispatch();
  const {colors, isDark} = useTheme();
  const isCouponExpire = useSelector(
    state => state.isSubscribedReducer.couponExpired,
  );
  const firestoreUserRef = firestore().collection('users').doc(user?.email);

  const darkMode = {
    background: {
      backgroundColor: colors.background,
    },
    text: {
      color: colors.text,
    },
  };

  let selectedData;
  const onPressHandler = item => {
    selectedData = bookDataHandler(item);
    navigateHandler();
  };
  const navigateHandler = () => {
    navigation.navigate(StackScreens.EGWhiteScreen, {
      bookData: selectedData,
    });
  };

  const isSubscriptionActive = React.useCallback(async () => {
    if (Platform.OS === 'ios') {
      const availablePurchases = await IAP.getAvailablePurchases();
      const sortedPurchases = availablePurchases.sort(
        (a, b) => b.transactionDate - a.transactionDate,
      );

      const latestReceipt = sortedPurchases[0].transactionReceipt;

      const validatedReceipt = await IAP.validateReceiptIos(
        {
          'receipt-data': latestReceipt,
          password: validReceiptPassword,
        },
        true,
      );

      const {latest_receipt_info: latestReceiptInfo} = validatedReceipt;

      const isSubscriptionValid = !!latestReceiptInfo.find(receipt => {
        const expirationInMillisecond = Number(receipt.expires_date_ms);
        return expirationInMillisecond > Date.now();
      });
      dispatch(isSubscribed(isSubscriptionValid));
    }
  }, [dispatch]);

  // NOTE: Check if any coupon is active.
  const checkIfCouponActive = React.useCallback(async () => {
    const firebaseUserData = await firestoreUserRef.get();

    if (firebaseUserData._data === undefined) {
      dispatch(isCouponActive(false));
    } else {
      dispatch(isCouponActive(firebaseUserData._data.activeCoupon));
    }
  }, [dispatch, firestoreUserRef]);

  // NOTE: Check if coupon duratioin is expired
  const checkCouponExpired = React.useCallback(async () => {
    const firebaseUserData = await firestoreUserRef.get();
    const couponExpireTimeStamp = await firebaseUserData._data.couponExpireDate; // NOTE: firebase timestamp object
    const currentDate = new Date();
    const expireDate = new Date(couponExpireTimeStamp.seconds * 1000); // NOTE: timestamp seconds converted to milliseconds

    if (expireDate && expireDate < currentDate) {
      // NOTE: for expire dialogue modal
      dispatch(couponExpired(true));

      // NOTE: if coupon expired
      await firestore().collection('users').doc(user?.email).update({
        activeCoupon: false,
        couponClaimedDate: '',
        couponExpireDate: '',
      });
    }
  }, [dispatch, firestoreUserRef, user]);

  React.useEffect(() => {
    IAP.initConnection();
    isSubscriptionActive();

    return () => {
      IAP.endConnection();
    };
  }, [isSubscriptionActive]);

  useFocusEffect(
    React.useCallback(() => {
      checkIfCouponActive();
      checkCouponExpired();
    }, [checkIfCouponActive, checkCouponExpired]),
  );

  const closeExpireModal = () => {
    dispatch(couponExpired(false));
  };

  return (
    <View style={[Global.container, darkMode.background]}>
      <ScrollView
        scrollEventThrottle={16}
        alwaysBounceVertical={false}
        bounces={false}
        decelerationRate="fast"
        showsVerticalScrollIndicator={false}>
        {/* Note: Latest year books */}
        {currentYearBooks && (
          <BookList
            data={currentYearBooks}
            navigation={navigation}
            darkMode={darkMode.text}
          />
        )}

        <TitleBanner title={Title.PreviousYear} />
        {/* Note: Previous year books */}
        <BookList
          data={previousYearBooks}
          navigation={navigation}
          darkMode={darkMode.text}
        />

        <TitleBanner title={Title.EGWhite} />
        <View style={styles.commentaryContent}>
          {EGWhiteData.map((item, id) => (
            <Pressable
              key={id}
              style={styles.bookSection}
              onPress={() => onPressHandler(item.title)}>
              <Image source={{uri: item.image}} style={styles.bookImg} />
            </Pressable>
          ))}
        </View>
      </ScrollView>
      <StatusBar
        backgroundColor={isDark ? colors.background : Colors.themeBlue}
      />

      <CouponInfoModal
        expire={true}
        closeModal={closeExpireModal}
        modalVisible={isCouponExpire}
        description={'Coupon Expired'}
      />
    </View>
  );
};
