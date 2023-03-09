import React from 'react';
import moment from 'moment';
import {useSelector} from 'react-redux';
import {View, Text, FlatList, Dimensions, Alert} from 'react-native';

import {styles} from './styles';
import Global from '@styles/Global';
import {EmptyRead} from './EmptyRead';
import Images from '@constants/Images';
import {useTheme} from '@theme/ThemeProvider';
import {CalendarUtil} from '@constants/CalendarUtil';
import {BooksData, BookTitles} from '@constants/Books';
import {HeaderToolBar} from './components/HeaderToolBar';
import {handleStopPlayer} from '@utils/trackPlayerHelper';
import {AudioPlayer} from '@components/AudioPlayer/AudioPlayer';
import {BookDetails} from '@components/Read/BookDetails/BookDetails';
import {getDayNumber, getDateFromDay, todayDayNumber} from '@utils/dayToDate';

const {width} = Dimensions.get('window');

export const ReadScreen = ({route, navigation}) => {
  const isSubscribedReducer = useSelector(state => state.isSubscribedReducer);
  const isSubscriptionActive = isSubscribedReducer.subscribed;
  const isCouponActive = isSubscribedReducer.couponActive;

  const subscription = isCouponActive || isSubscriptionActive;

  const bookData = route?.params?.bookData;
  const dataBook = bookData?.data || BooksData.Bridegroom;
  const bookTitle = bookData?.book || BookTitles.Bridegroom;
  const bookCover = bookData?.cover || Images.Bridegroom;

  const [changeTextSize, setChangeTextSize] = React.useState(0);
  const [showTrackPlayer, setShowTrackPlayer] = React.useState(false);
  const [modalDate, setModalDate] = React.useState(
    moment().format(CalendarUtil.calendarModalFormat),
  );
  const [toolbarDate, setToolbarDate] = React.useState(
    moment().format(CalendarUtil.month),
  );
  const [audioDate, setAudioDate] = React.useState(todayDayNumber());
  const [refSwiper, setRefSwiper] = React.useState();
  const [selectedDay, setSelectedDay] = React.useState(todayDayNumber());
  const [showBookmark, setShowBookmark] = React.useState(false);

  const {colors} = useTheme();

  const chapterIndex = React.useRef(moment().format('MM-DD'));

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

  // Note: Track player UI Modal
  const trackPressHandler = action => {
    setShowTrackPlayer(action);
  };

  // Note: Calendar day onpress action
  const calendarDayPress = day => {
    setSelectedDay(day.dateString);
    let selectDay = moment(day.dateString).format(
      CalendarUtil.calendarModalFormat,
    );

    setModalDate(selectDay);
  };

  const editCalendarDay = value => {
    setSelectedDay(moment(value).format(CalendarUtil.format));
    setModalDate(moment(value).format(CalendarUtil.calendarModalFormat));
  };

  // Note: Converts index(day number of the year) to date.
  const changeItemIndex = day => {
    setAudioDate(day);
    setSelectedDay(day);
    let date = getDateFromDay(day);
    let formattedDate = moment(date).format(CalendarUtil.month);

    setToolbarDate(formattedDate);
    chapterIndex.current = moment(date).format('MM-DD');
  };

  // Note: Functions that handle the scrollToIndex when a day is confirmed.
  const goIndex = () => {
    try {
      let dateNumber = getDayNumber(selectedDay);
      setAudioDate(dateNumber);
      refSwiper.scrollToIndex({animated: false, index: dateNumber});
    } catch (e) {
      Alert.alert('Scrolled out of bound', 'Please check the date.');
    }
  };

  const getItemLayout = (data, index) => {
    return {length: width, offset: width * index, index};
  };

  const viewConfigRef = React.useRef({viewAreaCoveragePercentThreshold: 50});
  const onViewableItemsChanged = React.useRef(({changed}) =>
    onItemsChanged(changed),
  );

  const onItemsChanged = items => {
    // chapterIndex.current = changeItemIndex(items[0].index);

    changeItemIndex(items[0].index);
    handleStopPlayer();
    trackPressHandler(false);
  };

  // Note: Bookmark UI Handler
  const showBookmarkHandler = action => {
    setShowBookmark(action);
  };

  /*
    Note: Remove the player when the focus screen is changed.
    * For eg. When screen is changed to Search screen then the player is closed.
  */

  React.useEffect(() => {
    return () => {
      trackPressHandler(false);
      handleStopPlayer();
    };
  }, []);

  const _renderItem = React.useCallback(
    ({item}) => {
      return (
        <BookDetails
          item={item}
          bookTitle={bookTitle}
          bookCover={bookCover}
          changeTextSize={changeTextSize}
          navigation={navigation}
          showbookmark={showBookmarkHandler}
        />
      );
    },
    [bookCover, changeTextSize, bookTitle, navigation],
  );

  if (subscription) {
    return (
      <View style={[Global.container, darkMode.background]}>
        <HeaderToolBar
          displayDate={toolbarDate}
          trackPressHandler={trackPressHandler}
          changeTextSize={changeTextSize}
          setChangeTextSize={setChangeTextSize}
          showBookmark={showBookmark}
          bookmarkHandler={showBookmarkHandler}
          editCalendarDay={editCalendarDay}
          modalDate={modalDate}
          selectedDay={selectedDay}
          calendarDayPress={calendarDayPress}
          setToolbarDate={setToolbarDate}
          goIndex={goIndex}
          chapterIndex={chapterIndex}
        />

        <FlatList
          ref={ref => setRefSwiper(ref)}
          data={dataBook}
          viewabilityConfig={viewConfigRef.current}
          onViewableItemsChanged={onViewableItemsChanged.current}
          horizontal
          pagingEnabled
          renderItem={_renderItem}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          initialScrollIndex={todayDayNumber()}
          getItemLayout={getItemLayout}
          initialNumToRender={4}
          scrollEnabled={true}
          removeClippedSubviews={true}
          maxToRenderPerBatch={5}
        />
        <View style={[styles.footer, darkMode.background]}>
          <Text style={[styles.footerDateText, darkMode.text]}>
            {toolbarDate}
          </Text>
        </View>

        {showTrackPlayer && (
          <AudioPlayer
            item={dataBook[audioDate]}
            pressHandler={trackPressHandler}
            bookTitle={bookTitle}
            bookCover={bookCover}
            date={chapterIndex.current}
          />
        )}
      </View>
    );
  }

  return <EmptyRead />;
};
