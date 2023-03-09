import React from 'react';
import {View, Text, TouchableOpacity, Platform} from 'react-native';
import PushNotification from 'react-native-push-notification';
import DateTimePicker from '@react-native-community/datetimepicker';

import styles from './styles';
import Global from '../../Styles/Global';
import {useTheme} from '../../theme/ThemeProvider';

export const ReminderScreen = () => {
  const [time, setTime] = React.useState(' -- : -- ');
  const [date, setDate] = React.useState(new Date());
  const [show, setShow] = React.useState(false);
  const {colors} = useTheme();

  const darkMode = {
    background: {
      backgroundColor: colors.background,
    },
    text: {
      color: colors.text,
    },
  };

  React.useEffect(() => {
    PushNotification.configure({
      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },
      popInitialNotification: true,
      requestPermissions: true,
    });
  }, []);

  const pushNotification = time => {
    PushNotification.createChannel(
      {
        channelId: 'dailyReminder',
        channelName: 'Reminder',
        playSound: false,
      },
      created => console.log(`createChannel returned '${created}'`),
    );

    PushNotification.localNotificationSchedule({
      channelId: 'dailyReminder',
      title: 'Daily Reminder!!!',
      message: 'Don’t forget to read your devotional for the day!',
      date: new Date(time),
      allowWhileIdle: true,

      repeatType: 'day',
      repeatTime: 2,
    });
  };

  const onChange = (event, selectedTime) => {
    const currentTime = selectedTime || date;
    setShow(Platform.OS === 'ios');
    setDate(currentTime);

    let tempDate = new Date(currentTime);
    let fTime = tempDate.getHours() + ':' + tempDate.getMinutes();

    let now = new Date();
    now.setDate(now.getDate());
    now.setHours(tempDate.getHours());
    now.setMinutes(tempDate.getMinutes());
    now.setMilliseconds(tempDate.getSeconds());

    setTime(fTime);
    pushNotification(now);
  };

  const showTimer = () => {
    setShow(true);
  };

  return (
    <View style={[Global.container, styles.container, darkMode.background]}>
      <View style={styles.content}>
        <TouchableOpacity onPress={() => showTimer()}>
          <Text style={[styles.selectTime, darkMode.text]}>Select Time</Text>
        </TouchableOpacity>
        <Text style={[styles.timeText, darkMode.text]}>{time}</Text>
        <View style={{flex: 1}}>
          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode={'time'}
              is24Hour={true}
              display={Platform.OS == 'android' ? 'default' : 'compact'}
              onChange={onChange}
            />
          )}
        </View>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.cancelNotificationButton}
          onPress={() => PushNotification.cancelAllLocalNotifications()}>
          <Text>Cancel PushNotification</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
