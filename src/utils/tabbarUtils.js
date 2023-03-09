import Icons from '../constants/Images';
import Labels from '../constants/TabbarLabels';
import {CommonActions} from '@react-navigation/native';

let offset = 0;
export const onScrollHandler = (navigation, event) => {
  const currentOffset = event?.nativeEvent?.contentOffset.y;
  let direction = currentOffset > offset ? 'down' : 'up';
  offset = currentOffset;
  if (direction === 'down') {
    navigation.dispatch(
      CommonActions.setParams({
        tabBarVisible: false,
      }),
    );
  }

  if (currentOffset === 0) {
    navigation.dispatch(
      CommonActions.setParams({
        tabBarVisible: true,
      }),
    );
  }
};

export const activeTabbarIcon = route => {
  let source;
  if (route.name === Labels.Library) {
    source = Icons.LibraryIcon;
  } else if (route.name === Labels.Search) {
    source = Icons.SearchIcon;
  } else if (route.name === Labels.Read) {
    source = Icons.ReadIcon;
  } else if (route.name === Labels.PrayerJournal) {
    source = Icons.PrayerJournalIcon;
  } else if (route.name === Labels.Profile) {
    source = Icons.ProfileIcon;
  }

  return source;
};

export const activeTabbarLabel = route => {
  let label;
  if (route.name === Labels.Library) {
    label = Labels.Library;
  } else if (route.name === Labels.Search) {
    label = Labels.Search;
  } else if (route.name === Labels.Read) {
    label = Labels.Read;
  } else if (route.name === Labels.PrayerJournal) {
    label = Labels.PrayerJournal;
  } else if (route.name === Labels.Profile) {
    label = Labels.Profile;
  }

  return label;
};
