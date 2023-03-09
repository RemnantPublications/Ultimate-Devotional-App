import React from 'react';
import 'react-native-gesture-handler';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';

import Colors from '../Styles/Colors';
import {TabNavigator} from './tab.navigation';
import {useTheme} from '../theme/ThemeProvider';
import {StackScreens} from '../constants/Constants';
import {EGWhieScreen} from '../Screens/EGWhite/EGWhite';
import {PaywallScreen} from '../Screens/Paywall/Paywall';
import {ReminderScreen} from '../Screens/Reminder/Reminder';
import {BookmarkScreen} from '../Screens/Bookmark/bookmark';
import {CouponScreen} from '../Screens/Coupon/coupon.screen';
import {BookmarkHeader} from '../Components/Read/Bookmark/Header';
import {EditPrayer} from '../Components/PrayerJournal/EditPrayer/editPrayer';

const Stack = createStackNavigator();

export const HomeStack = () => {
  const {colors} = useTheme();

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
        headerBackTitle: '',
      }}>
      <Stack.Screen
        name={StackScreens.Tab}
        component={TabNavigator}
        options={{
          ...TransitionPresets.ScaleFromCenterAndroid,
        }}
      />
      <Stack.Screen
        name={StackScreens.EditScreen}
        component={EditPrayer}
        options={({route}) => {
          return {
            ...TransitionPresets.ScaleFromCenterAndroid,
            title: `Edit "${route.params.taskTitle}"`,
            headerShown: true,
            headerStyle: {
              backgroundColor: colors.background,
            },
            headerTintColor: colors.text,
          };
        }}
      />
      <Stack.Screen
        name={StackScreens.ReminderScreen}
        component={ReminderScreen}
        options={({route}) => {
          return {
            ...TransitionPresets.ScaleFromCenterAndroid,
            title: 'Reminder',
            headerShown: true,
            headerStyle: {
              backgroundColor: colors.background,
            },
            headerTintColor: colors.text,
          };
        }}
      />
      <Stack.Screen
        name={StackScreens.BookmarkScreen}
        component={BookmarkScreen}
        options={({route}) => {
          return {
            ...TransitionPresets.ScaleFromCenterAndroid,
            title: 'Bookmarks',
            headerShown: true,
            headerStyle: {
              backgroundColor: colors.background,
            },
            headerTintColor: colors.text,
            headerRight: () => <BookmarkHeader />,
          };
        }}
      />
      <Stack.Screen
        name={StackScreens.EGWhiteScreen}
        component={EGWhieScreen}
        options={({route}) => {
          return {
            ...TransitionPresets.SlideFromRightIOS,
            title: `${route.params.bookData.book}`,
            headerShown: true,
            headerStyle: {
              backgroundColor: colors.background,
            },
            headerTintColor: colors.text,
            headerTitleStyle: {
              color: Colors.themeBlue,
              fontFamily: 'GothamMedium-Italic',
            },
          };
        }}
      />
      <Stack.Screen
        name={StackScreens.PaywallScreen}
        component={PaywallScreen}
        options={({route}) => {
          return {
            ...TransitionPresets.SlideFromRightIOS,
            title: 'Subscription',
            headerShown: true,
            headerStyle: {
              backgroundColor: colors.background,
            },
            headerTintColor: colors.text,
          };
        }}
      />

      <Stack.Screen
        name={StackScreens.CouponScreen}
        component={CouponScreen}
        options={({route}) => {
          return {
            ...TransitionPresets.SlideFromRightIOS,
            title: 'Claim Coupon',
            headerShown: true,
            headerStyle: {
              backgroundColor: colors.background,
            },
            headerTintColor: colors.text,
          };
        }}
      />
    </Stack.Navigator>
  );
};
