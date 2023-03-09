import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {View, TouchableOpacity, Text, FlatList, Image} from 'react-native';

import {styles} from './styles';
import Colors from '../../Styles/Colors';
import {useTheme} from '../../theme/ThemeProvider';
import {removeBookmark} from '../../Redux/actions/action';

export const BookmarkScreen = () => {
  const {colors, isDark} = useTheme();
  const bookmarks = useSelector(state => state.getBookmark.list);
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

  const deleteBookmark = index => {
    dispatch(removeBookmark(index));
  };

  const ItemView = ({item}) => {
    return (
      <View style={[styles.itemContent, darkMode.background]}>
        <View style={styles.bookSection}>
          <Image source={{uri: item.bookCover}} style={styles.bookCoverImg} />
          <View style={styles.bookTitleSection}>
            <Text style={[styles.bookTitle, darkMode.text]}>
              {item.bookTitle}
            </Text>

            <Text style={styles.bookChapter}>{item.chapterTitle}</Text>
          </View>
          <TouchableOpacity onPress={() => deleteBookmark(item.id)}>
            <Icon
              name="delete"
              size={25}
              color={Colors.red700}
              style={styles.delete}
            />
          </TouchableOpacity>
        </View>
        <Text style={[styles.bookmarkText, darkMode.text]}>{item.text}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={bookmarks}
        showsVerticalScrollIndicator={false}
        renderItem={ItemView}
      />
    </View>
  );
};
