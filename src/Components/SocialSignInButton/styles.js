import Colors from '../../Styles/Colors';

export default {
  content: {
    backgroundColor: Colors.themeBlue,
    padding: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 3,
    marginHorizontal: 15,
  },
  socialLogo: {
    backgroundColor: Colors.white,
    padding: 8,
  },
  logoImg: {
    height: 35,
    width: 35,
  },
  signInTextSection: {
    paddingHorizontal: 70,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  signInText: {
    color: Colors.white,
    fontWeight: 'bold',
    fontSize: 16,
    textAlignVertical: 'center',
  },
  errorSection: {
    flex: 0.9,
    justifyContent: 'flex-start',
    marginTop: 25,
  },
  errorText: {
    color: Colors.red,
    textAlign: 'center',
  },
};
