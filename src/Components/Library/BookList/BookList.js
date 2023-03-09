import React from 'react';
import {useSelector} from 'react-redux';
import {View, FlatList, Image, Pressable, Text} from 'react-native';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';

import {styles} from './styles';
import {StackScreens} from '@constants/Constants';
import {bookDataHandler} from '@utils/bookDataHandler';

export const BookList = ({data, navigation, darkMode}) => {
  let selectedData;
  const isSubscribedReducer = useSelector(state => state.isSubscribedReducer);
  const isSubscriptionActive = isSubscribedReducer.subscribed;
  const isCouponActive = isSubscribedReducer.couponActive;
  const subscription = isCouponActive || isSubscriptionActive;

  const onPressHandler = item => {
    selectedData = bookDataHandler(item);
    navigateHandler();
  };

  const navigateHandler = () => {
    if (!subscription) {
      navigation.navigate(StackScreens.PaywallScreen);
    } else {
      navigation.navigate('Read', {
        bookData: selectedData,
      });
    }
  };

  return (
    <FlatList
      data={data}
      horizontal
      showsHorizontalScrollIndicator={false}
      renderItem={({item}) => (
        <View style={styles.content}>
          <Pressable
            onPress={() => onPressHandler(item.title)}
            style={styles.imgWrapper}>
            <Image source={{uri: item.image}} style={styles.bookImg} />
          </Pressable>
          <View style={{height: hp('2%')}} />
          <Text style={[styles.bookTitle, darkMode]}>{item.title}</Text>
          <Text style={[styles.bookTitle, darkMode]}>{item.date}</Text>
        </View>
      )}
    />
  );
};
