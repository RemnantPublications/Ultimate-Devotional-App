import React from 'react';
import {Text, TouchableHighlight} from 'react-native';

import Colors from '@styles/Colors';

export const RenderText = ({content, onPress, ...props}) => {
  return (
    <TouchableHighlight
      underlayColor={Colors.gray200}
      activeOpacity={1}
      onPress={() => onPress(content)}>
      <Text {...props} suppressHighlighting={true}>
        {content}
      </Text>
    </TouchableHighlight>
  );
};
