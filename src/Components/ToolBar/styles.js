import Colors from '../../Styles/Colors';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

export default {
  content: {
    backgroundColor: Colors.white,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 5,
  },
  calendarSection: {
    flex: 0.6,
  },
  calendarButtonText: {
    fontSize: 15,
    fontFamily: 'GothamBold',
  },
  calendarButton: {
    backgroundColor: Colors.gray100,
    alignSelf: 'flex-start',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 18,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textFormat: {
    flex: 0.3,
    alignItems: 'flex-end',
    elevation: 10,
    zIndex: 10,
  },
  speakerIcon: {
    flex: 0.2,
    alignItems: 'center',
  },
  speakerImg: {
    resizeMode: 'contain',
    height: 27,
    width: 27,
  },

  // Text Change Slider
  sliderView: {
    flex: 0.1,
    backgroundColor: Colors.white,
    borderRadius: 20,
    position: 'absolute',
    right: 39,
    top: 40,
    elevation: 5,
    zIndex: 5,
    flexDirection: 'row',
    paddingHorizontal: 10,
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 0,
  },
  increaseButton: {
    borderRightWidth: 1,
    borderRightColor: Colors.gray300,
    paddingHorizontal: 10,
  },
  decreaseButton: {
    paddingHorizontal: 10,
  },
};
