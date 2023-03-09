import Colors from '../../../Styles/Colors';

export const styles = {
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  headerTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    color: Colors.themeBlue,
    textTransform: 'uppercase',
    marginBottom: 15,
  },
  sectionTitleText: {
    fontWeight: 'bold',
  },
  textInput: {
    marginVertical: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: Colors.gray300,
  },
  dateSection: {
    flexDirection: 'row',
  },
  date: {
    flex: 1,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: Colors.gray300,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
  },
  calendarImg: {
    flex: 0.3,
  },
  calendarIconImg: {
    resizeMode: 'contain',
    width: 35,
    height: 35,
    tintColor: Colors.gray800,
  },
  datePicker: {
    flex: 1,
    marginLeft: 10,
  },
  buttonSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 20,
  },
  deleteButton: {
    backgroundColor: Colors.gray800,
  },
  confirmModal: {
    flex: 1,
  },
};
