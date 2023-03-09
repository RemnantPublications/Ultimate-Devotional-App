import React from 'react';
import moment from 'moment';
import {useDispatch} from 'react-redux';
import {View, Text, TouchableOpacity, Image} from 'react-native';

import {styles} from './styles';
import Images from '@constants/Images';
import {CalendarUtil} from '@constants/CalendarUtil';
import {RadioButton} from '../RadioButton/RadioButton';
import {toggleItem} from '../../../Redux/actions/action';

export const PrayerSection = ({
  date,
  edit,
  taskId,
  taskTitle,
  darkModeImg,
  darkModeText,
  activeButton,
  taskDescription,
}) => {
  const dispatch = useDispatch();
  const togglePrayer = index => {
    if (index != null) {
      dispatch(toggleItem(index));
    }
  };
  return (
    <View style={styles.prayer}>
      <TouchableOpacity onPress={() => togglePrayer(taskId)}>
        <RadioButton selected={activeButton} />
      </TouchableOpacity>
      <View style={styles.prayerDetails}>
        <View style={styles.prayerText}>
          <Text style={[styles.taskTitle, darkModeText]}>{taskTitle}</Text>
          {!!taskDescription && (
            <Text style={[styles.prayerDescription, darkModeText]}>
              {taskDescription}
            </Text>
          )}
        </View>

        <View style={styles.prayerDateSection}>
          <Text style={styles.prayerDateText}>
            {moment(new Date(date)).format(CalendarUtil.prayerDate)}
          </Text>
          <TouchableOpacity
            onPress={() => edit(taskTitle, taskDescription, date, taskId)}>
            <Image
              source={Images.EditIcon}
              style={[styles.prayerEditIcon, darkModeImg]}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
