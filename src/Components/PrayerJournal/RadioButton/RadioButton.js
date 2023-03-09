import React from 'react';
import {View} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import {styles} from './styles';

export const RadioButton = props => {
  return (
    <View style={[styles.unselected, props.style]}>
      {props.selected && <MaterialIcons name="check" size={13} color="blue" />}
    </View>
  );
};
