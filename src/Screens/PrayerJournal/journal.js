import React from 'react';
import {useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {View, Text, TouchableOpacity, Image, FlatList} from 'react-native';

import moment from 'moment';
import {styles} from './styles';
import Global from '../../Styles/Global';
import Colors from '../../Styles/Colors';
import Images from '../../constants/Images';
import {useTheme} from '../../theme/ThemeProvider';
import {CalendarUtil} from '../../constants/CalendarUtil';
import {prayerActiveButton} from '../../constants/PrayerJourney';
import {AddPrayer} from '../../Components/PrayerJournal/AddPrayer/addprayer';
import {PrayerSection} from '../../Components/PrayerJournal/PrayerSection/prayerSection';

export const PrayerJournalScreen = ({navigation}) => {
  const {colors, isDark} = useTheme();
  const [activeButton, setActiveButton] = React.useState('Active Requests');
  const [addContents, setAddContents] = React.useState(false);

  const addContentPressHandler = action => {
    setAddContents(action);
  };

  /*
   * Edit button press handler
   * Navigation to "EditScreen" with task details to act as placeholder in the screen.
   */
  const editItemPressHandler = (taskTitle, taskDescription, date, taskId) => {
    navigation.navigate('EditScreen', {
      taskTitle: taskTitle,
      taskDescription: taskDescription,
      taskDate: date,
      taskId: taskId,
    });
  };

  /*
   * Button Handler for Active or Answered Tab
   */
  const activeButtonHandler = action => {
    setActiveButton(action);
  };

  const list = useSelector(state => state.getPrayer.list);

  /*
   * Requests categorized into recent or previous month.
   * Query: Can user enter future date? Where does that map?
   */
  const currentMonth = moment().format(CalendarUtil.monthFormat);
  const prevMonthData = list.filter(
    item => moment(item.date).format(CalendarUtil.monthFormat) != currentMonth,
  );

  const currentMonthData = list.filter(
    item => moment(item.date).format(CalendarUtil.monthFormat) == currentMonth,
  );

  /*
   * Filtered Data for completed requests to show in "Answered Prayers" tab
   */
  const filterPrevMonthData = prevMonthData.filter(
    item => item.completed == true,
  );
  const filterCurrentMonthData = currentMonthData.filter(
    item => item.completed == true,
  );

  const remainingCurrentMonthPrayers = currentMonthData.filter(
    item => item.completed !== true,
  );
  const remainingPrevMonthPrayers = prevMonthData.filter(
    item => item.completed !== true,
  );

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
    <View style={Global.container}>
      {/* Header: Active Requests/ Prayers */}
      <View style={[styles.header, darkMode.background]}>
        <View style={styles.headerButton}>
          {prayerActiveButton.map((item, id) => (
            <TouchableOpacity
              key={id}
              onPress={() => activeButtonHandler(item.title)}
              style={[
                {
                  backgroundColor:
                    item.title == activeButton
                      ? Colors.themeBlue
                      : Colors.gray800,
                },
                styles.activeButton,
              ]}>
              <Image source={Images.HalfLogo} style={styles.halflogo} />
              <Text
                style={styles.activeButtonText}
                numberOfLines={1}
                adjustsFontSizeToFit={true}>
                {item.title}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View>
          <Text style={[styles.currentPrayerText, darkMode.text]}>
            Currently praying for:
          </Text>
        </View>
      </View>

      {/* Body Section */}
      <View style={[styles.body, darkMode.background]}>
        {/* Add Icon */}
        <TouchableOpacity
          onPress={() => addContentPressHandler(!addContents)}
          style={styles.addPrayer}>
          <Icon name="add" size={30} color={Colors.white} />
        </TouchableOpacity>

        {/* Recent Section */}
        <View style={styles.prayerSection}>
          {!addContents ? (
            <>
              <View style={styles.prayerRecentSection}>
                <Text style={styles.prayerCategory}>Recent</Text>
                <FlatList
                  data={
                    activeButton == 'Answered Prayers'
                      ? filterCurrentMonthData
                      : remainingCurrentMonthPrayers
                  }
                  showsVerticalScrollIndicator={false}
                  removeClippedSubviews={true}
                  maxToRenderPerBatch={5}
                  renderItem={({item}) => {
                    return (
                      <PrayerSection
                        taskId={item.id}
                        taskTitle={item.title}
                        taskDescription={item.description}
                        date={item.date}
                        activeButton={item.completed}
                        edit={editItemPressHandler}
                        darkModeText={darkMode.text}
                        darkModeImg={darkMode.image}
                      />
                    );
                  }}
                />
              </View>
              {/* More than one month Section */}
              <View style={styles.prayerMoreThanSection}>
                <Text style={styles.prayerCategory}>More than one month</Text>
                <FlatList
                  data={
                    activeButton == 'Answered Prayers'
                      ? filterPrevMonthData
                      : remainingPrevMonthPrayers
                  }
                  renderItem={({item}) => (
                    <PrayerSection
                      taskId={item.id}
                      taskTitle={item.title}
                      taskDescription={item.description}
                      date={item.date}
                      activeButton={item.completed}
                      edit={editItemPressHandler}
                      darkModeText={darkMode.text}
                      darkModeImg={darkMode.image}
                    />
                  )}
                />
              </View>
            </>
          ) : (
            <AddPrayer addContentPressHandler={addContentPressHandler} />
          )}
        </View>
      </View>
    </View>
  );
};
