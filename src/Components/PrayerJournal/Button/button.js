import React from 'react';
import {Text, TouchableOpacity} from 'react-native';

import {styles} from './styles';

export const Button = ({title, pressHandler, style}) => {
  return (
    <TouchableOpacity style={[styles.content, style]} onPress={pressHandler}>
      <Text style={styles.buttonTitle}>{title}</Text>
    </TouchableOpacity>
  );
};
