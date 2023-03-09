import Colors from '../../../Styles/Colors';

export const styles = {
  content: {
    backgroundColor: Colors.themeBlue,
    paddingRight: 20,
    paddingVertical: 3,
    marginHorizontal: 9,
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  halflogoImg: {
    resizeMode: 'contain',
    flex: 0.08,
    height: 50,
  },
  title: {
    flex: 1,
    color: Colors.white,
    fontSize: 20,
    fontWeight: 'bold',
    fontStyle: 'italic',
    marginLeft: 20,
    letterSpacing: 0.8,
  },
};
