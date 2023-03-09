import React from 'react';
import {
  View,
  TouchableWithoutFeedback,
  Text,
  TextInput,
  Image,
  Platform,
} from 'react-native';
import {useDispatch} from 'react-redux';
import DateTimePicker from '@react-native-community/datetimepicker';

import {styles} from './styles';
import {Button} from '../Button/button';
import Images from '../../../constants/Images';
import {useTheme} from '../../../theme/ThemeProvider';
import {ConfirmBox} from '../../ConfirmBox/confirmBox';
import {editItem, removeItem} from '../../../Redux/actions/action';

export const EditPrayer = ({route, navigation}) => {
  const {colors, isDark} = useTheme();
  const taskTitle = route?.params?.taskTitle;
  const taskDescription = route?.params?.taskDescription;
  const taskDate = route?.params?.taskDate;
  const taskId = route?.params?.taskId;

  const darkMode = {
    background: {
      backgroundColor: colors.background,
    },
    text: {
      color: colors.text,
    },
    image: {
      tintColor: colors.tintColor,
    },
    modal: {
      backgroundColor: colors.modal,
    },
  };

  const [date, setDate] = React.useState(new Date());
  const [prayerDate, setPrayerDate] = React.useState(taskDate);
  const [show, setShow] = React.useState(false);
  const [confirmDelete, setConfirmDelete] = React.useState(false);

  const [title, setTitle] = React.useState(taskTitle);
  const [description, setDescription] = React.useState(taskDescription);
  const dispatch = useDispatch();

  // Note: Dispatch function from redux
  const editPrayer = (id, title, description, date) => {
    dispatch(editItem(id, title, description, date));
  };
  //  Note: Dispatch function from redux
  const removePrayer = id => {
    dispatch(removeItem(id));
    deletePressHandler(false);
    navigation.goBack();
  };

  // Note: onChange for dateTimePicker get User defined date
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);

    let tempDate = new Date(currentDate);
    let formattedDate =
      tempDate.getDate() +
      '/' +
      (tempDate.getMonth() + 1) +
      '/' +
      tempDate.getFullYear();

    setPrayerDate(formattedDate);
  };

  const showMode = () => {
    setShow(true);
  };

  const showDatePicker = () => {
    showMode('date');
  };

  // Note: Handler for Delete Button
  const deletePressHandler = action => {
    setConfirmDelete(action);
  };

  // Note: Handler for Save Button
  const savePressHandler = (taskId, title, description, date) => {
    if (title != null) {
      editPrayer(taskId, title, description, date);
    }
    navigation.goBack();
  };

  return (
    <View style={[styles.content, darkMode.background]}>
      <Text style={styles.headerTitle}>Edit request</Text>

      <View>
        <Text style={[styles.sectionTitleText, darkMode.text]}>Title</Text>
        <TextInput
          style={[styles.textInput, darkMode.text]}
          defaultValue={title}
          onChangeText={val => setTitle(val)}
        />
      </View>

      <View>
        <Text style={[styles.sectionTitleText, darkMode.text]}>Details</Text>
        <TextInput
          style={[styles.textInput, darkMode.text]}
          defaultValue={description}
          onChangeText={val => setDescription(val)}
        />
      </View>

      <View>
        <Text style={[styles.sectionTitleText, darkMode.text]}>
          Date Display
        </Text>
        <View style={styles.dateSection}>
          <View style={styles.date}>
            <Text style={darkMode.text}>{prayerDate}</Text>

            <View style={styles.calendarImg}>
              <Image
                source={Images.CalendarIcon}
                style={[styles.calendarIconImg, darkMode.image]}
              />
            </View>
          </View>

          <View style={styles.datePicker}>
            <TouchableWithoutFeedback onPress={() => showDatePicker()}>
              <Text style={[styles.sectionTitleText, darkMode.text]}>
                Date Picker
              </Text>
            </TouchableWithoutFeedback>
            {/* TODO: DateTimePicker should be within the screen, not pop up */}
            {show && (
              <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode="date"
                display={Platform.OS == 'android' ? 'default' : 'compact'}
                onChange={onChange}
              />
            )}
          </View>
        </View>
      </View>

      <View style={styles.buttonSection}>
        <Button
          title="save"
          pressHandler={() => {
            savePressHandler(taskId, title, description, prayerDate);
          }}
        />
        <Button
          title="delete"
          pressHandler={() => {
            deletePressHandler(true);
          }}
          style={styles.deleteButton}
        />
      </View>

      {/* Note: Delete confimation modal. */}
      <ConfirmBox
        visible={confirmDelete}
        pressHandler={deletePressHandler}
        title="Delete"
        buttonTitle="delete"
        from="addPrayer"
        onPressAction={() => removePrayer(taskId)}
      />
    </View>
  );
};
