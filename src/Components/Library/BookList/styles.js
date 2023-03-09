import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

export const styles = {
  content: {
    padding: wp('4%'),
  },
  imgWrapper: {
    borderRadius: 10,
  },
  bookImg: {
    resizeMode: 'cover',
    height: hp('35%'),
    width: wp('50%'),
    borderRadius: 10,
  },
  bookTitle: {
    textAlign: 'center',
    fontSize: wp('3.8%'),
  },
};
