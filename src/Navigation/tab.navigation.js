import React from 'react';
import {View, Image, StyleSheet, Text} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import Colors from '@styles/Colors';
import {ReadScreen} from '@screens/Read/read';
import {useTheme} from '@theme/ThemeProvider';
import {SearchScreen} from '@screens/Search/search';
import {ProfileScreen} from '@screens/Profile/profile';
import {LibraryScreen} from '@screens/Library/library';
import {PrayerJournalScreen} from '@screens/PrayerJournal/journal';
import {activeTabbarIcon, activeTabbarLabel} from '../utils/tabbarUtils';

const Tab = createBottomTabNavigator();

export const TabNavigator = () => {
  const {colors, isDark} = useTheme();
  return (
    <Tab.Navigator
      swipeEnabled={false}
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarStyle: [
          styles.tabBarOption,
          {backgroundColor: isDark ? colors.background : Colors.white},
        ],
        tabBarIcon: ({focused}) => {
          return (
            <View pointerEvents={'none'}>
              <Image
                source={activeTabbarIcon(route)}
                style={[
                  {
                    tintColor: focused
                      ? isDark
                        ? colors.text
                        : Colors.themeBlue
                      : isDark
                      ? Colors.gray600
                      : Colors.gray800,
                  },
                  styles.tabBarImg,
                ]}
              />
            </View>
          );
        },
        tabBarLabel: ({focused}) => {
          return (
            <View pointerEvents={'none'}>
              <Text
                style={[
                  styles.tabBarLabel,
                  {
                    marginVertical: focused ? 5 : null,
                    color: isDark ? colors.text : Colors.themeBlue,
                  },
                ]}>
                {focused && activeTabbarLabel(route)}
              </Text>
            </View>
          );
        },
      })}>
      <Tab.Screen name="Library" component={LibraryScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="Read" component={ReadScreen} />
      <Tab.Screen name="Prayer Journal" component={PrayerJournalScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBarLabel: {
    fontSize: wp('2.5%'),
    letterSpacing: 0.16,
  },
  tabBarImg: {
    resizeMode: 'contain',
    height: 25,
  },
  tabBarOption: {
    paddingVertical: hp('1%'),
  },
});
