import React from 'react';
import {useDispatch} from 'react-redux';
import {View, Text, TouchableOpacity} from 'react-native';

import {styles} from './styles';
import {useTheme} from '../../../theme/ThemeProvider';
import {removeAllBookmark} from '../../../Redux/actions/action';

export const BookmarkHeader = () => {
  const {colors, isDark} = useTheme();
  const dispatch = useDispatch();
  const removeAllBookmarks = () => {
    dispatch(removeAllBookmark(0));
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
    <View style={styles.headerContent}>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => removeAllBookmarks()}>
        <Text style={styles.removeText}>Remove All</Text>
      </TouchableOpacity>
    </View>
  );
};
