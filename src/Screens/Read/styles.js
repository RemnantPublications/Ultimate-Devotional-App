import {StyleSheet} from 'react-native';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';

import Colors from '@styles/Colors';
import Global from '@styles/Global';

export const styles = StyleSheet.create({
  // popup and calendar
  modalView: {
    backgroundColor: Colors.themeBlue,
    paddingTop: 20,
    marginHorizontal: 30,
    borderRadius: 15,
  },
  selectDate: {
    marginHorizontal: 30,
    marginBottom: 15,
  },
  selectDataText: {
    fontSize: 11,
    fontFamily: 'GothamMedium',
    textTransform: 'uppercase',
    marginBottom: 20,
    letterSpacing: 1,
  },
  editDate: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  currentDate: {
    fontFamily: 'GothamBold',
    fontSize: 30,
    flex: 1,
  },
  calendar: {
    marginVertical: 20,
  },
  calendarWrapper: {
    height: hp(45),
    backgroundColor: Colors.white,
  },
  confirmButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    backgroundColor: Colors.white,
    padding: 20,
    paddingTop: 30,
    borderBottomRightRadius: 15,
    borderBottomLeftRadius: 15,
  },
  confirmText: {
    marginLeft: 25,
    fontSize: 16,
    color: Colors.themeBlue,
    textTransform: 'uppercase',
  },
  cancelText: {
    fontSize: 16,
    color: Colors.themeBlue,
    textTransform: 'uppercase',
  },

  // book detail
  content: {
    ...Global.container,
    marginTop: 15,
  },
  footer: {
    padding: 20,
    backgroundColor: Colors.white,
    elevation: 5,
  },
  footerDateText: {
    textAlign: 'center',
    fontFamily: 'GothamBold',
  },
  bookDetailContent: {
    flex: 1,
    marginVertical: 20,
    marginHorizontal: 15,
  },
  bookTitleText: {
    textAlign: 'center',
    fontSize: 26,
    paddingBottom: 10,
    textTransform: 'uppercase',
    letterSpacing: 1,
    color: Colors.themeBlue,
    fontFamily: 'GothamMedium',
    fontWeight: '900',
  },
  bookBibleText: {
    textAlign: 'center',
    paddingHorizontal: 20,
    fontSize: 20,
    color: Colors.gray600,
    letterSpacing: 1,
    fontFamily: 'GothamMedium-Italic',
  },
  bookMainText: {
    textAlign: 'left',
    paddingTop: 18,
    fontSize: 16,
    letterSpacing: 1,
    lineHeight: 23,
    fontFamily: 'GothamMedium',
  },
  referenceText: {
    textAlign: 'left',
    paddingBottom: 10,
    fontSize: 18,
    letterSpacing: 1,
    fontFamily: 'GothamMedium-Italic',
  },
  divider: {
    alignSelf: 'center',
  },
  dividerImg: {
    alignSelf: 'center',
    resizeMode: 'contain',
    width: 350,
    height: 60,
  },
  bibleReflection: {
    letterSpacing: 1,
    fontSize: 18,
    fontFamily: 'GothamMedium',
  },
  reflectionText: {
    textTransform: 'uppercase',
    color: Colors.themeBlue,
    lineHeight: 23,
    fontFamily: 'GothamMedium',
  },
});
