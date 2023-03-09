import Colors from '../../Styles/Colors';

export default {
  search: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    margin: 20,
    borderRadius: 40,
    alignItems: 'center',
    backgroundColor: Colors.white,
  },
  searchImg: {
    flex: 0.1,
    resizeMode: 'contain',
    height: 20,
  },
  textInput: {
    flex: 1,
    borderRadius: 25,
    paddingLeft: 10,
  },
  itemViewText: {
    padding: 15,
    backgroundColor: Colors.white,
    marginHorizontal: 10,
    borderBottomColor: Colors.gray300,
    borderBottomWidth: 1,
  },
  itemSeparator: {
    height: 0.5,
    width: '100%',
    backgroundColor: Colors.gray800,
  },
  dataView: {
    flex: 1,
  },
  dropdownMenu: {
    backgroundColor: Colors.white,
    borderRadius: 6,
    padding: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  modalView: {
    backgroundColor: Colors.white,
    padding: 30,
    marginHorizontal: 30,
    borderRadius: 15,
  },
  dropdownCategory: {
    padding: 10,
  },
  dropdownText: {
    textAlign: 'center',
  },
  cancelButton: {
    marginTop: 15,
    backgroundColor: Colors.gray100,
    padding: 10,
    borderRadius: 5,
    elevation: 2,
  },
  cancelText: {
    fontSize: 16,
    color: Colors.themeBlue,
    textAlign: 'center',
  },
};
