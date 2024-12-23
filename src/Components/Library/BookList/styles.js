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
    aspectRatio: 0.66,
    width: wp('55%'), ////increased bym 5%
    borderRadius: 10,
  },
  bookTitle: {
    textAlign: 'center',
    fontSize: wp('3.8%'),
  },
};
