import {StyleSheet} from 'react-native';

import Global from '../../Styles/Global';
import Colors from '../../Styles/Colors';

export const styles = StyleSheet.create({
  container: {
    ...Global.container,
    padding: 5,
    backgroundColor: Colors.gray300,
  },
  itemContent: {
    backgroundColor: Colors.white,
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray300,
    padding: 10,
    paddingBottom: 20,
    borderRadius: 10,
  },
  bookSection: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray600,
  },
  bookCoverImg: {
    resizeMode: 'contain',
    height: 130,
    width: 130,
  },
  bookTitleSection: {
    flex: 1,
  },
  bookTitle: {
    fontSize: 16,
    textTransform: 'capitalize',
    fontStyle: 'italic',
  },
  bookChapter: {
    fontSize: 15,
    color: Colors.themeBlue,
    textTransform: 'capitalize',
    fontStyle: 'italic',
  },
  delete: {
    flex: 1,
  },
  bookmarkText: {
    fontSize: 17,
    lineHeight: 22,
    marginTop: 10,
  },
});
