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

import moment from 'moment';
import {styles} from './styles';
import {Button} from '../Button/button';
import Images from '../../../constants/Images';
import {addItem} from '../../../Redux/actions/action';
import {ConfirmBox} from '../../ConfirmBox/confirmBox';
import {useTheme} from '../../../theme/ThemeProvider';
import {CalendarUtil} from '../../../constants/CalendarUtil';

export const AddPrayer = ({addContentPressHandler}) => {
  const {colors, isDark} = useTheme();
  const [date, setDate] = React.useState(new Date());
  const [prayerDate, setPrayerDate] = React.useState(CalendarUtil.date);
  const [show, setShow] = React.useState(false);
  const [confirmDelete, setConfirmDelete] = React.useState(false);

  const [title, setTitle] = React.useState();
  const [description, setDescription] = React.useState();
  const dispatch = useDispatch();

  // Note: Dispatch function from redux
  const addPrayer = (title, description, date) => {
    dispatch(addItem(title, description, date));
    setTitle(null);
  };

  // Note: onChange for dateTimePicker get User defined date
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);

    let tempDate = new Date(currentDate);
    let formattedDate = moment(new Date(tempDate)).format(
      CalendarUtil.prayerDateFormat,
    );
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
  const savePressHandler = (title, description, date) => {
    if (title != null) {
      addPrayer(title, description, date);
      addContentPressHandler(false);
    }
  };

  // Note: Dark mode scheme
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

  return (
    <View>
      <TouchableWithoutFeedback onPress={() => addContentPressHandler(false)}>
        <Text style={styles.headerTitle}>Add new request</Text>
      </TouchableWithoutFeedback>

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
            <Text style={[styles.displayDate, darkMode.text]}>
              {prayerDate}
            </Text>
            <Image
              source={Images.CalendarIcon}
              style={[styles.calendarIconImg, darkMode.image]}
            />
          </View>

          <View style={styles.datePicker}>
            <TouchableWithoutFeedback onPress={() => showDatePicker()}>
              <Text style={[styles.sectionTitleText, darkMode.text]}>
                Date Picker
              </Text>
            </TouchableWithoutFeedback>
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
            savePressHandler(title, description, prayerDate);
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

      <ConfirmBox
        visible={confirmDelete}
        pressHandler={deletePressHandler}
        title="Delete"
        buttonTitle="delete"
        from="addPrayer"
      />
    </View>
  );
};
