import React from 'react';
import DeviceInfo from 'react-native-device-info';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {CommonActions, useNavigation} from '@react-navigation/native';
import {View, Text, TouchableOpacity, Image, ScrollView} from 'react-native';

import styles from './styles';
import Colors from '@styles/Colors';
import Global from '@styles/Global';
import {useTheme} from '@theme/ThemeProvider';
import {Toggle} from '@components/Toggle/Toggle';
import {StackScreens} from '@constants/Constants';
import {AuthContext} from '@navigation/authProvider';
import {ConfirmBox} from '@components/ConfirmBox/confirmBox';
import {ToggleMessage} from '@components/Toggle/ToggleMessage';

const menuItems = [
  {
    iconName: 'timer',
    itemTitle: 'Daily Reminder',
    navigateTo: StackScreens.ReminderScreen,
  },
  {
    iconName: 'bookmark',
    itemTitle: 'Bookmarks',
    navigateTo: StackScreens.BookmarkScreen,
  },
  {
    iconName: 'payment',
    itemTitle: 'Subscription',
    navigateTo: StackScreens.PaywallScreen,
  },
  {
    iconName: 'card-giftcard',
    itemTitle: 'Claim Coupon',
    navigateTo: StackScreens.CouponScreen,
  },
];

const MenuItems = ({iconName, navigateTo, itemTitle}) => {
  const navigation = useNavigation();
  const {colors} = useTheme();
  const darkMode = {
    background: {
      backgroundColor: colors.background,
    },
    text: {
      color: colors.text,
    },
  };
  return (
    <View style={styles.reminder}>
      <Icon name={iconName} size={25} color={Colors.gray600} />
      <TouchableOpacity
        style={styles.dailyReminder}
        onPress={() => navigation.navigate(navigateTo)}>
        <Text style={[styles.reminderText, darkMode.text]}>{itemTitle}</Text>
      </TouchableOpacity>
    </View>
  );
};

export const ProfileScreen = ({navigation}) => {
  const {colors} = useTheme();
  const {user, logout} = React.useContext(AuthContext);
  const [confirmLogout, setConfirmLogout] = React.useState(false);

  const confirmLogoutHandler = action => {
    setConfirmLogout(action);
  };

  const logoutConfirm = () => {
    setConfirmLogout(false);
    logout();
  };

  React.useEffect(() => {
    if (!user) {
      navigation?.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name: StackScreens.SplashScreen}],
        }),
      );
    }
  }, [user, navigation]);

  const darkMode = {
    background: {
      backgroundColor: colors.background,
    },
    text: {
      color: colors.text,
    },
  };

  return (
    <View style={[Global.container, darkMode.background]}>
      <View style={styles.profileContainer}>
        <View style={styles.content}>
          <View style={styles.userAvatar}>
            <Image
              source={{uri: user?.photoURL}}
              style={styles.userAvatarImg}
            />
          </View>

          <View style={styles.userInfo}>
            <Text style={[styles.userName, darkMode.text]}>
              {user?.displayName}
            </Text>
            <Text style={[styles.userEmail, darkMode.text]}>{user?.email}</Text>
          </View>
        </View>
      </View>

      <ScrollView style={styles.bodySection}>
        <View style={[styles.darkModeToggle, darkMode.background]}>
          <ToggleMessage />
          <Toggle />
        </View>

        {menuItems.map((item, index) => (
          <MenuItems
            key={index}
            iconName={item.iconName}
            itemTitle={item.itemTitle}
            navigateTo={item.navigateTo}
          />
        ))}
      </ScrollView>

      <Text style={styles.appVersion}>
        App version: {DeviceInfo.getVersion()}
      </Text>

      <View style={styles.logOutSection}>
        <Text style={styles.logOutText}>Logout</Text>
        <TouchableOpacity onPress={() => confirmLogoutHandler(true)}>
          <Icon name="logout" size={25} color={Colors.gray100} />
        </TouchableOpacity>

        <ConfirmBox
          visible={confirmLogout}
          pressHandler={confirmLogoutHandler}
          title="Logout"
          buttonTitle="logout"
          from="profile"
          onPressAction={logoutConfirm}
          user={user}
          navigation={navigation}
        />
      </View>
    </View>
  );
};
