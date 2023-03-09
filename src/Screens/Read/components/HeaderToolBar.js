import React from 'react';
import moment from 'moment';
import {Calendar} from 'react-native-calendars';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {View, Text, TouchableOpacity, TextInput} from 'react-native';

import {styles} from '../styles';
import Colors from '@styles/Colors';
import {PopUp} from '@components/Modal/Modal';
import {ToolBar} from '@components/ToolBar/ToolBar';
import {CalendarUtil} from '@constants/CalendarUtil';

export const HeaderToolBar = ({
  goIndex,
  modalDate,
  selectedDay,
  displayDate,
  chapterIndex,
  showBookmark,
  setToolbarDate,
  changeTextSize,
  editCalendarDay,
  bookmarkHandler,
  calendarDayPress,
  trackPressHandler,
  setChangeTextSize,
}) => {
  const [showCalendar, setShowCalendar] = React.useState(false);
  const [isEditing, setEditing] = React.useState(false);
  const editDate = React.useRef(modalDate);

  // Note: Text size changer
  const ontextSizeValueChange = index => {
    setChangeTextSize(index);
  };

  // Note: Calendar Modal
  const calendarPressHandler = action => {
    setShowCalendar(action);
  };

  // Note: Calendar OK presshandler
  const calendarConfirmHandler = () => {
    setToolbarDate(moment(selectedDay).format(CalendarUtil.month));
    goIndex();
    chapterIndex.current = moment(selectedDay).format('MM-DD');
    calendarPressHandler(false);
  };
  return (
    <>
      <ToolBar
        calendarPressHandler={calendarPressHandler}
        displayDate={displayDate}
        trackPressHandler={trackPressHandler}
        ontextSizeValueChange={ontextSizeValueChange}
        changeTextSize={changeTextSize}
        showBookmark={showBookmark}
        bookmarkHandler={bookmarkHandler}
      />

      {/* Note: Calendar PopUp */}
      <PopUp
        pressHandler={calendarPressHandler}
        visible={showCalendar}
        animationType="fade"
        transparent={true}>
        <View style={[styles.modalView]}>
          <View style={styles.selectDate}>
            <Text style={styles.selectDataText}>Select Date</Text>
            <View style={styles.editDate}>
              {isEditing ? (
                <TextInput
                  // value={modalDate}
                  style={styles.currentDate}
                  onChangeText={value => editCalendarDay(value)}
                  onBlur={() => setEditing(false)}
                  placeholder={editDate.current}
                />
              ) : (
                <Text style={styles.currentDate}>{modalDate}</Text>
              )}
              <Icon
                name={isEditing ? 'check-bold' : 'pencil'}
                size={30}
                color="black"
                onPress={() => setEditing(!isEditing)}
              />
            </View>
          </View>
          <View style={styles.calendarWrapper}>
            <Calendar
              current={CalendarUtil.date}
              // minDate={CalendarUtil.minDate}
              // maxDate={CalendarUtil.maxDate}
              onDayPress={day => calendarDayPress(day)}
              enableSwipeMonths={true}
              hideExtraDays
              markedDates={{
                [selectedDay]: {
                  selected: true,
                  disableTouchEvent: true,
                  selectedColor: Colors.themeBlue,
                  selectedTextColor: Colors.white,
                },
              }}
              theme={{
                todayTextColor: Colors.themeBlue,
              }}
            />
          </View>

          <View style={styles.confirmButtons}>
            <TouchableOpacity onPress={() => calendarPressHandler(false)}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => calendarConfirmHandler()}>
              <Text style={styles.confirmText}>Ok</Text>
            </TouchableOpacity>
          </View>
        </View>
      </PopUp>
    </>
  );
};
