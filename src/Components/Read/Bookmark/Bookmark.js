import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {View, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {styles} from './styles';
import Colors from '../../../Styles/Colors';
import {useTheme} from '../../../theme/ThemeProvider';
import {addBookmark} from '../../../Redux/actions/action';

export const Bookmark = ({bookmarkHandler}) => {
  const {colors, isDark} = useTheme();

  const dispatch = useDispatch();
  const bookmarkText = useSelector(state => state.getSelectedBookmark.text);

  const bookCover = bookmarkText.bookCover;
  const bookTitle = bookmarkText.bookTitle;
  const chapterTitle = bookmarkText.chapterTitle;
  const text = bookmarkText.text;

  const checkBookmark = useSelector(state => state.checkBookmark.check);
  const [bookmarked, setBookmarked] = React.useState(false);

  React.useEffect(() => {
    if (checkBookmark == false) {
      setBookmarked(false);
    } else {
      setBookmarked(true);
    }
  }, [checkBookmark]);

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
    primary: {
      backgroundColor: colors.primary,
    },
  };

  const bookmarkOnPressHandler = () => {
    dispatch(addBookmark(text, chapterTitle, bookTitle, bookCover));
    setBookmarked(true);
  };

  return (
    <View style={[styles.content, darkMode.content]}>
      <TouchableOpacity onPress={() => bookmarkHandler(false)}>
        <Icon
          name="close"
          size={25}
          color={isDark ? Colors.white : Colors.black}
        />
      </TouchableOpacity>
      <View style={styles.bookmark}>
        <Text style={[styles.bookmarkText, darkMode.text]}>Bookmark</Text>
        <TouchableOpacity onPress={() => bookmarkOnPressHandler()}>
          <Icon
            name={bookmarked ? 'bookmark' : 'bookmark-border'}
            size={28}
            color={isDark ? Colors.white : Colors.black}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};
