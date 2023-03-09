import {StyleSheet} from 'react-native';

import Colors from '../../Styles/Colors';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

export const styles = StyleSheet.create({
  playerContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
  },
  content: {
    backgroundColor: Colors.gray200,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 5,
    paddingVertical: 15,
    elevation: 10,
  },
  titleSection: {
    paddingHorizontal: 5,
    flex: 1,
  },
  playerTitle: {
    fontWeight: 'bold',
    // fontSize: 16,
    fontSize: wp('4%'),
    color: Colors.gray600,
  },
  bookTitle: {
    color: Colors.gray600,
    fontSize: wp('3.5%'),
  },
  actionButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 5,
    paddingVertical: 5,
  },
  sliderView: {
    position: 'relative',
    bottom: 20,
    elevation: 10,
  },
  slider: {
    width: '100%',
  },
  loadingIndicator: {
    paddingHorizontal: 5,
    width: 42,
    height: 42,
  },
});
