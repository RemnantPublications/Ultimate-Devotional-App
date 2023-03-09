import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Colors from '../../Styles/Colors';

export const styles = {
  commentaryContent: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  bookSection: {
    paddingHorizontal: 5,
    paddingVertical: 10,
  },
  bookImg: {
    height: hp('25%'),
    width: wp('30%'),
    borderRadius: 5,
    resizeMode: 'stretch',
    backgroundColor: Colors.gray300,
  },
};
