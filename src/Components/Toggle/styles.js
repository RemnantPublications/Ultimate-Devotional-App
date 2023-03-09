import Colors from '../../Styles/Colors';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

export const styles = {
  textStyle: {
    fontSize: wp('4%'),
    color: Colors.gray800,
  },
  containerStyle: {
    padding: hp('2.8%'),
  },
};
