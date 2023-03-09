import Colors from '../../Styles/Colors';

export default {
  content: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  logoSection: {
    flex: 0.3,
    marginTop: 30,
    marginBottom: 20,
    justifyContent: 'center',
  },
  logoImg: {
    height: 170,
    width: 170,
    tintColor: Colors.themeBlue,
  },
  title: {
    flex: 0.2,
    justifyContent: 'flex-start',
  },
  titleText: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  signInSection: {
    flex: 0.5,
  },
  footer: {
    flex: 0.1,
    justifyContent: 'center',
  },
  footerText: {
    fontSize: 11,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
};
