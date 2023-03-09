import React from 'react';
import {useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  Text,
  View,
  Image,
  FlatList,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import styles from './styles';
import Global from '@styles/Global';
import Colors from '@styles/Colors';
import Images from '@constants/Images';
import {useTheme} from '@theme/ThemeProvider';
import {PopUp} from '@components/Modal/Modal';
import {bookDataHandler} from '@utils/bookDataHandler';
import {StackScreens, Title} from '@constants/Constants';
import {LibraryBooksData, EGWhiteData} from '@constants/LibraryBooksData';
import moment from 'moment';

const allBooks = LibraryBooksData.concat(EGWhiteData);

export const SearchScreen = ({navigation}) => {
  const isSubscriptionActive = useSelector(
    state => state.isSubscribedReducer.subscribed,
  );

  const {colors} = useTheme();
  const [filteredData, setFilteredData] = React.useState([]);
  const [masterData, setMasterData] = React.useState([]);
  const [search, setSearch] = React.useState('');
  const [dropdown, setDropdown] = React.useState(false);
  const [searchLabel, setSearchLabel] = React.useState('All');

  const darkMode = {
    background: {
      backgroundColor: colors.background,
    },
    content: {
      backgroundColor: colors.content,
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

  React.useEffect(() => {
    setFilteredData(allBooks);
    setMasterData(allBooks);
  }, []);

  React.useEffect(() => {
    if (searchLabel === Title.EGWhite) {
      setFilteredData(EGWhiteData);
    } else if (searchLabel === Title.All) {
      setFilteredData(allBooks);
    } else if (searchLabel === Title.Devotional) {
      setFilteredData(LibraryBooksData);
    }
  }, [searchLabel]);

  const searchFilter = text => {
    if (text) {
      const newData = masterData.filter(item => {
        const itemData = item.title
          ? item.title.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredData(newData);
      setSearch(text);
    } else {
      setFilteredData(masterData);
      setSearch(text);
    }
  };

  let selectedData;
  const onPressHandler = item => {
    if (!isSubscriptionActive) {
      navigation.navigate(StackScreens.PaywallScreen);
    }

    try {
      selectedData = bookDataHandler(item);
      const isEgWhite = EGWhiteData.find(elm => elm.title === item);

      if (!isEgWhite) {
        navigateHandler();
        return;
      } else {
        navigateEGWhite();
      }
    } catch (e) {}
  };

  const navigateHandler = () => {
    navigation.navigate(StackScreens.Read, {
      bookData: selectedData,
    });
  };

  const navigateEGWhite = () => {
    navigation.navigate(StackScreens.EGWhiteScreen, {
      bookData: selectedData,
    });
  };

  const ItemView = ({item}) => {
    return (
      <TouchableOpacity onPress={() => onPressHandler(item.title)}>
        <Text style={[styles.itemViewText, darkMode.background, darkMode.text]}>
          {item.title.toUpperCase()}
        </Text>
      </TouchableOpacity>
    );
  };

  const dropdownHandler = action => {
    setDropdown(action);
  };

  const searchLabelHandler = label => {
    setDropdown(false);
    setSearchLabel(label);
  };

  return (
    <View style={[Global.container, darkMode.content]}>
      <View style={[styles.search, darkMode.background]}>
        <Image
          source={Images.SearchIcon}
          style={[styles.searchImg, darkMode.image]}
        />
        <TextInput
          style={[styles.textInput, darkMode.background, darkMode.text]}
          placeholder="Search"
          defaultValue={search}
          onChangeText={text => searchFilter(text)}
        />
        <TouchableOpacity onPress={() => dropdownHandler(true)}>
          <View style={styles.dropdownMenu}>
            <Text>{searchLabel}</Text>
            <Icon name="arrow-drop-down" size={25} color={Colors.gray800} />
          </View>
        </TouchableOpacity>
      </View>

      <View style={[styles.dataView, darkMode.background]}>
        <FlatList
          data={filteredData}
          keyExtractor={(item, index) => index.toString()}
          renderItem={ItemView}
        />
      </View>

      <PopUp visible={dropdown} transparent={true} animationType="fade">
        <View style={[styles.modalView, darkMode.modal]}>
          <View>
            <TouchableOpacity
              style={styles.dropdownCategory}
              onPress={() => searchLabelHandler(Title.All)}>
              <Text style={[styles.dropdownText, darkMode.text]}>All</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.dropdownCategory}
              onPress={() => searchLabelHandler(Title.Devotional)}>
              <Text style={[styles.dropdownText, darkMode.text]}>
                Devotional
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.dropdownCategory}
              onPress={() => searchLabelHandler(Title.EGWhite)}>
              <Text style={[styles.dropdownText, darkMode.text]}>
                E.G. Commentary
              </Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            onPress={() => dropdownHandler(false)}
            style={styles.cancelButton}>
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </PopUp>
    </View>
  );
};
