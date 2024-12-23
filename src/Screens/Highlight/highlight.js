import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {View, TouchableOpacity, Text, FlatList, Image} from 'react-native';

import {styles} from './styles';
import Colors from '../../Styles/Colors';
import {useTheme} from '../../theme/ThemeProvider';
import {removeHighlight} from '../../Redux/actions/action';

export const HighlightScreen = () => {
  const {colors, isDark} = useTheme();
  const highlights = useSelector(state => state.getHighlight.list);
  const dispatch = useDispatch();

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

  const deleteHighlight = index => {
    dispatch(removeHighlight(index));
  };

  const ItemView = ({item}) => {
    return (
      <View style={[styles.itemContent, darkMode.background]}>
        <View style={styles.bookSection}>
          <Image
            source={{uri: item.devotionalCover}}
            style={styles.bookCoverImg}
          />
          <View style={styles.bookTitleSection}>
            <Text style={[styles.bookTitle, darkMode.text]}>
              {item.devotionalDay}
            </Text>

            <Text style={styles.bookChapter}>{item.devotionalTitle}</Text>
          </View>
          <TouchableOpacity onPress={() => deleteHighlight(item.id)}>
            <Icon
              name="delete"
              size={25}
              color={Colors.red700}
              style={styles.delete}
            />
          </TouchableOpacity>
        </View>
        {/* Highlight Title */}
        <Text style={[styles.titleText, darkMode.text]}>Highlight:</Text>
        <Text style={[styles.bookmarkText, darkMode.text]}>{item.text}</Text>
        {/* Note Title */}
        <Text style={[styles.titleText, darkMode.text]}>Note:</Text>
        <Text style={[styles.bookmarkText, darkMode.text]}>{item.note}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={highlights}
        showsVerticalScrollIndicator={false}
        renderItem={ItemView}
      />
    </View>
  );
};
