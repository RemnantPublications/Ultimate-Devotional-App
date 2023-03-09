import Colors from '../../Styles/Colors';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  header: {
    backgroundColor: Colors.gray300,
    flex: 0.1,
    paddingVertical: 20,
    paddingHorizontal: 5,
  },
  headerButton: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
  activeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 5,
  },
  halflogo: {
    resizeMode: 'stretch',
    width: 25,
    height: 50,
  },
  activeButtonText: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
    paddingHorizontal: 13,
    fontStyle: 'italic',
  },
  currentPrayerText: {
    fontSize: 14,
    fontStyle: 'italic',
    margin: 10,
    marginLeft: 20,
    letterSpacing: 0.8,
    fontWeight: 'bold',
  },

  // addbutton
  addPrayer: {
    position: 'absolute',
    right: 20,
    top: -25,
    backgroundColor: Colors.themeBlue,
    borderRadius: 50,
    padding: 10,
    zIndex: 5,
    elevation: 5,
  },

  // body section
  body: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  prayerSection: {
    flex: 1,
    margin: 25,
  },
  prayerRecentSection: {
    // flex: 0.5,
    marginBottom: 20,
  },
  prayerMoreThanSection: {
    flex: 0.7,
    marginBottom: 10,
  },
  prayerCategory: {
    fontWeight: 'bold',
    fontSize: 16,
    color: Colors.themeBlue,
    textTransform: 'uppercase',
    marginBottom: 15,
  },
});
