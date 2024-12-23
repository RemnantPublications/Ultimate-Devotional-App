/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
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
import {
  NobleCharacterData,
  PrepareDaysData,
  GodHeartData,
  ItFinishedData,
  BridegroomComingData,
  PromisedLandData,
  WeKingData,
  IntoWorldData,
} from '@constants/SearchDevotionals';
import moment from 'moment';

const allBooks = NobleCharacterData.concat(PrepareDaysData);

export const SearchScreen = ({navigation}) => {
  const isSubscriptionActive = useSelector(
    state => state.isSubscribedReducer.subscribed,
  );

  const {colors} = useTheme();
  const [filteredData, setFilteredData] = React.useState([]);
  const [masterData, setMasterData] = React.useState([]);
  const [search, setSearch] = React.useState('');
  const [dropdown, setDropdown] = React.useState(false);
  const [searchLabel, setSearchLabel] = React.useState('Into All The World');

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
    setFilteredData(IntoWorldData);
    setMasterData(IntoWorldData);
  }, []);

  React.useEffect(() => {
    if (searchLabel === Title.TheNobleCharacter) {
      setFilteredData(NobleCharacterData);
      setMasterData(NobleCharacterData);
    } else if (searchLabel === Title.PrepareForTheLastDays) {
      setFilteredData(PrepareDaysData);
      setMasterData(PrepareDaysData);
    } else if (searchLabel === Title.GodKnowsTheHeart) {
      setFilteredData(GodHeartData);
      setMasterData(GodHeartData);
    } else if (searchLabel === Title.ItIsFinished) {
      setFilteredData(ItFinishedData);
      setMasterData(ItFinishedData);
    } else if (searchLabel === Title.TheBridegroomIsComing) {
      setFilteredData(BridegroomComingData);
      setMasterData(BridegroomComingData);
    } else if (searchLabel === Title.JourneyToThePromisedLand) {
      setFilteredData(PromisedLandData);
      setMasterData(PromisedLandData);
    } else if (searchLabel === Title.WeWantAKing) {
      setFilteredData(WeKingData);
      setMasterData(WeKingData);
    } else if (searchLabel === Title.IntoAllTheWorld) {
      setFilteredData(IntoWorldData);
      setMasterData(IntoWorldData);
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
      navigateHandler();
    } catch (e) {
      // Handle any potential errors here if needed
    }
  };

  const navigateHandler = () => {
    navigation.navigate(StackScreens.Read, {
      bookData: selectedData,
    });
  };

  const ItemView = ({ item }) => {
    // Split search term into multiple words
    const searchTerms = search.trim().toUpperCase().split(' ');

    // Split bibleText into words to highlight each matching term
    const highlightedText = item.title.split(' ').map((word, index) => {
      const isMatch = searchTerms.some(term => word.toUpperCase().includes(term));

      return (
        <Text
          key={index}
          style={isMatch ? [styles.highlightedText, darkMode.text] : darkMode.text}
        >
          {word}{' '}
        </Text>
      );
    });

    return (
      <TouchableOpacity onPress={() => onPressHandler(item.title)}>
        <View style={[styles.itemContainer, darkMode.background]}>
          <Text style={[styles.dateText, darkMode.background]}>
            {item.dayNumber} {/* Display the date */}
          </Text>
          <Text style={[styles.itemViewText, darkMode.background]}>
            {highlightedText}
          </Text>
        </View>
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

      <Text style={{ color: Colors.themeBlue, fontSize: 18, fontWeight: 'bold', 
      marginLeft: 30, marginTop: -10, marginBottom: 15}}>RESULTS</Text>

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
              onPress={() => searchLabelHandler(Title.TheNobleCharacter)}>
              <Text style={[styles.dropdownText, darkMode.text]}>
                The Noble Character
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.dropdownCategory}
              onPress={() => searchLabelHandler(Title.PrepareForTheLastDays)}>
              <Text style={[styles.dropdownText, darkMode.text]}>
                Prepare For The Last Days
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.dropdownCategory}
              onPress={() => searchLabelHandler(Title.GodKnowsTheHeart)}>
              <Text style={[styles.dropdownText, darkMode.text]}>
                God Knows The Heart
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.dropdownCategory}
              onPress={() => searchLabelHandler(Title.ItIsFinished)}>
              <Text style={[styles.dropdownText, darkMode.text]}>
                It Is Finished
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.dropdownCategory}
              onPress={() => searchLabelHandler(Title.TheBridegroomIsComing)}>
              <Text style={[styles.dropdownText, darkMode.text]}>
                The Bridegroom Is Coming
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.dropdownCategory}
              onPress={() => searchLabelHandler(Title.JourneyToThePromisedLand)}>
              <Text style={[styles.dropdownText, darkMode.text]}>
                Journey To The Promised Land
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.dropdownCategory}
              onPress={() => searchLabelHandler(Title.WeWantAKing)}>
              <Text style={[styles.dropdownText, darkMode.text]}>
                We Want A King
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.dropdownCategory}
              onPress={() => searchLabelHandler(Title.IntoAllTheWorld)}>
              <Text style={[styles.dropdownText, darkMode.text]}>
                Into All The World
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
