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
    width: wp('50%'), ////increased by 5%
    borderRadius: 10,
  },
  bookTitle: {
    textAlign: 'center',
    fontSize: wp('3.8%'),
  },
  imageContainer: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ribbon: {
    position: 'absolute',
    top: -hp('1.5%'), // move it upward so half overlaps outside
    alignSelf: 'center', // centers it horizontally over the image
    backgroundColor: 'red',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    zIndex: 1,
    elevation: 2, // adds subtle shadow on Android
  },

  ribbonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
};
