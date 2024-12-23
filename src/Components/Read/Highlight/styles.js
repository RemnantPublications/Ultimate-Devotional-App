import {StyleSheet} from 'react-native';

import Colors from '../../../Styles/Colors';

export const styles = StyleSheet.create({
  content: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    alignItems: 'center',
    padding: 10,
    paddingVertical: 14,
    justifyContent: 'space-between',
    elevation: 5,
  },
  bookmark: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  bookmarkText: {
    fontFamily: 'GothamMedium',
    fontSize: 16,
    marginRight: 10,
  },

  headerContent: {
    marginRight: 10,
  },
  deleteButton: {
    backgroundColor: Colors.red700,
    padding: 10,
    borderRadius: 5,
  },
  removeText: {
    color: Colors.white,
    textAlign: 'center',
  },
});
