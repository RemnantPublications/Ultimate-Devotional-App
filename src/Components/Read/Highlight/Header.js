import React from 'react';
import {useDispatch} from 'react-redux';
import {View, Text, TouchableOpacity, Alert} from 'react-native';

import {styles} from './styles';
import {useTheme} from '../../../theme/ThemeProvider';
import {removeAllHighlight} from '../../../Redux/actions/action';

export const HighlightHeader = () => {
  const {colors} = useTheme();
  const dispatch = useDispatch();

  const confirmAndRemoveAllHighlights = () => {
    Alert.alert(
      'Confirm Deletion',
      'Are you sure you want to remove all highlights? This action cannot be undone.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => dispatch(removeAllHighlight(0)),
        },
      ],
    );
  };

  return (
    <View style={styles.headerContent}>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={confirmAndRemoveAllHighlights}>
        <Text style={styles.removeText}>Remove All</Text>
      </TouchableOpacity>
    </View>
  );
};
