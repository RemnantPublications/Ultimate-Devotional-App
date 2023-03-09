import Colors from '../../Styles/Colors';

export const styles = {
  confirmModal: {
    flex: 1,
    backgroundColor: Colors.transparent,
    justifyContent: 'center',
  },
  modalView: {
    backgroundColor: Colors.white,
    padding: 30,
    marginHorizontal: 30,
    borderRadius: 15,
  },
  buttonTitleText: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  confirmDesc: {
    marginVertical: 15,
    paddingRight: 13,
  },
  confirmDescText: {
    color: Colors.gray800,
    fontSize: 16,
    letterSpacing: 0.8,
  },
  confirmButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  actionText: {
    marginLeft: 25,
    fontSize: 16,
    color: Colors.red,
    textTransform: 'capitalize',
  },
  cancelText: {
    fontSize: 16,
    color: Colors.themeBlue,
  },
};
