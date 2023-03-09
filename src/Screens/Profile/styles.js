import Colors from '../../Styles/Colors';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

export default {
  profileContainer: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray300,
  },
  content: {
    padding: 10,
    paddingVertical: 15,
    alignItems: 'center',
  },
  userAvatar: {
    marginBottom: 10,
    borderRadius: 50,
  },
  userAvatarImg: {
    resizeMode: 'contain',
    height: hp('10%'),
    width: wp('20%'),
    borderRadius: 50,
  },
  userInfo: {
    alignItems: 'center',
  },
  userName: {
    fontSize: wp('5%'),
  },
  userEmail: {
    fontSize: wp('4%'),
  },
  bodySection: {
    flex: 1,
  },
  darkModeToggle: {
    flexDirection: 'row',
    backgroundColor: Colors.gray200,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: 20,
  },
  logOutSection: {
    flex: 0.1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 40,
    paddingVertical: 5,
    backgroundColor: Colors.red700,
  },
  logOutText: {
    textTransform: 'uppercase',
    color: Colors.gray100,
  },
  reminder: {
    padding: hp('2%'),
    borderTopWidth: 1,
    borderTopColor: Colors.gray300,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dailyReminder: {
    flex: 1,
    paddingLeft: 10,
  },
  reminderText: {
    fontSize: wp('4%'),
  },
  appVersion: {
    fontStyle: 'italic',
    paddingHorizontal: 20,
    paddingVertical: 10,
    color: Colors.gray600,
  },
};
