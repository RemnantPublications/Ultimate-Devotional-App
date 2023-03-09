import * as React from 'react';
import {Text, View} from 'react-native';

import {styles} from './styles';
import Colors from '../../Styles/Colors';
import {useTheme} from '../../theme/ThemeProvider';

export const ToggleMessage = () => {
  const {colors, isDark} = useTheme();

  const text = isDark ? '🌙   Dark mode' : '🌞   Light mode';

  return (
    <View style={styles.containerStyle}>
      <Text
        style={[
          styles.textStyle,
          {color: isDark ? colors.text : Colors.black},
        ]}>
        {text}
      </Text>
    </View>
  );
};
