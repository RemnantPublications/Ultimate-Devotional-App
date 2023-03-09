import React from 'react';
import {
  View,
  Modal,
  TouchableOpacity,
  Text,
  TouchableWithoutFeedback,
} from 'react-native';

import {styles} from './styles';
import {useTheme} from '../../theme/ThemeProvider';

export const ConfirmBox = ({
  visible,
  pressHandler,
  title,
  buttonTitle,
  onPressAction,
}) => {
  const {colors} = useTheme();
  const darkMode = {
    background: {
      backgroundColor: colors.background,
    },
    text: {
      color: colors.text,
    },
    image: {
      tintColor: colors.tintColor,
    },
    modal: {
      backgroundColor: colors.modal,
    },
  };

  return (
    <Modal visible={visible} animationType="fade" transparent={true}>
      <TouchableOpacity
        style={styles.confirmModal}
        onPress={() => pressHandler(false)}>
        <TouchableWithoutFeedback>
          <View style={[styles.modalView, darkMode.background]}>
            <View>
              <Text style={[styles.buttonTitleText, darkMode.text]}>
                {title}?
              </Text>
            </View>

            <View style={styles.confirmDesc}>
              <Text style={styles.confirmDescText}>
                All saved data remains synced to your account across multiple
                devices.
              </Text>
            </View>

            <View style={styles.confirmButtons}>
              <TouchableOpacity onPress={() => pressHandler(false)}>
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => onPressAction()}>
                <Text style={styles.actionText}>{buttonTitle}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </TouchableOpacity>
    </Modal>
  );
};
