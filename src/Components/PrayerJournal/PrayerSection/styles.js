import {StyleSheet} from 'react-native';

import Colors from '@styles/Colors';

export const styles = StyleSheet.create({
  prayerSection: {
    flex: 0.5,
    margin: 25,
  },
  prayerCategory: {
    fontSize: 16,
    marginBottom: 15,
    fontWeight: 'bold',
    color: Colors.themeBlue,
    textTransform: 'uppercase',
  },
  prayer: {
    marginBottom: 5,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  prayerDetails: {
    flex: 1,
    marginLeft: 10,
    marginBottom: 10,
    paddingBottom: 5,
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomColor: Colors.gray800,
  },
  prayerText: {
    flex: 1,
  },
  taskTitle: {
    fontWeight: 'bold',
  },
  prayerDescription: {
    fontSize: 12,
  },
  prayerDateSection: {
    flexDirection: 'row',
  },
  prayerDateText: {
    marginRight: 10,
    color: Colors.themeBlue,
  },
  prayerEditIcon: {
    width: 20,
    height: 20,
  },
});
