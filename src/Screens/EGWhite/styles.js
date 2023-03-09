import {StyleSheet} from 'react-native';

import Colors from '../../Styles/Colors';
import Global from '../../Styles/Global';

export const styles = StyleSheet.create({
  content: {
    ...Global.container,
    padding: 10,
  },
  titleText: {
    color: Colors.themeBlue,
    fontFamily: 'GothamBold',
    fontSize: 23,
    marginVertical: 10,
    textAlign: 'center',
  },
  mainText: {
    fontSize: 18,
    fontFamily: 'GothamMedium',
    lineHeight: 23,
    margin: 10,
  },
});
