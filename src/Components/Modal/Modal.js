import React from 'react';
import {
  View,
  Modal,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Text,
} from 'react-native';
import Colors from '../../Styles/Colors';

export const PopUp = props => {
  // Set a default function if pressHandler is not passed
  const handlePressOutside = () => {
    if (props.pressHandler) {
      props.pressHandler(false);
    }
  };

  return (
    <Modal
      visible={props.visible}
      animationType={props.animationType}
      transparent={props.transparent}
      onRequestClose={handlePressOutside} // Close on Android back button
    >
      <TouchableOpacity
        style={styles.confirmModal}
        activeOpacity={1}
        onPress={handlePressOutside} // Close modal on outside press
      >
        <TouchableWithoutFeedback>
          <View>
            {typeof props.children === 'string' ? (
              <Text>{props.children}</Text>
            ) : (
              props.children
            )}
          </View>
        </TouchableWithoutFeedback>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  confirmModal: {
    flex: 1,
    backgroundColor: Colors.transparent,
    justifyContent: 'center',
  },
});
