import React from 'react';
import DeviceInfo from 'react-native-device-info';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {CommonActions, useNavigation} from '@react-navigation/native';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
} from 'react-native';

import styles from './styles';
import Colors from '@styles/Colors';
import Global from '@styles/Global';
import {useTheme} from '@theme/ThemeProvider';
import {Toggle} from '@components/Toggle/Toggle';
import {StackScreens} from '@constants/Constants';
import {AuthContext} from '@navigation/authProvider';
import {DeleteAccountConfirmBox} from '@components/ConfirmDeleteAccount/confirm'; // New import
import {ToggleMessage} from '@components/Toggle/ToggleMessage';
import {ConfirmBox} from '@components/ConfirmBox/confirmBox';
import {Platform} from 'react-native';

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
    iconName: 'highlight',
    itemTitle: 'Highlights',
    navigateTo: StackScreens.HighlightScreen,
  },
  {
    iconName: 'payment',
    itemTitle: 'Subscription',
    navigateTo: StackScreens.PaywallScreen,
  },
  ...(Platform.OS === 'android'
    ? [
        {
          iconName: 'card-giftcard',
          itemTitle: 'Claim Coupon',
          navigateTo: StackScreens.CouponScreen,
        },
      ]
    : []),
  {
    iconName: 'delete-forever',
    itemTitle: 'Delete Account',
  },
];

const MenuItems = ({iconName, navigateTo, itemTitle, onPress}) => {
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
        onPress={
          onPress
            ? onPress
            : navigateTo
            ? () => navigation.navigate(navigateTo)
            : null
        }>
        <Text style={[styles.reminderText, darkMode.text]}>{itemTitle}</Text>
      </TouchableOpacity>
    </View>
  );
};

export const ProfileScreen = ({navigation}) => {
  const {colors} = useTheme();
  const {user, logout} = React.useContext(AuthContext);
  const [confirmLogout, setConfirmLogout] = React.useState(false);
  const [confirmDelete, setConfirmDelete] = React.useState(false); // State for delete confirmation

  const confirmLogoutHandler = action => {
    setConfirmLogout(action);
  };

  const confirmDeleteHandler = action => {
    setConfirmDelete(action);
  };

  const logoutConfirm = () => {
    setConfirmLogout(false);
    logout();
  };

  const deleteAccountConfirm = () => {
    setConfirmDelete(false);
    // Add account deletion logic here, for example, making an API call to delete the account
    Alert.alert(
      'Account Deleted',
      'Your account has been successfully deleted.',
    );
    logout(); // Logout user after deletion
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
            onPress={
              item.itemTitle === 'Delete Account'
                ? () => confirmDeleteHandler(true)
                : () => item.navigateTo && navigation.navigate(item.navigateTo)
            }
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

      {/* Delete Account Button */}
      <View>
        <DeleteAccountConfirmBox // Use the new delete account confirmation box
          visible={confirmDelete}
          pressHandler={confirmDeleteHandler}
          title="Delete Account"
          buttonTitle="Delete"
          from="profile"
          onPressAction={deleteAccountConfirm}
          user={user}
          navigation={navigation}
        />
      </View>
    </View>
  );
};
