import React from 'react';
import {
  View,
  Modal,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';

import Colors from '../../Styles/Colors';

export const PopUp = props => {
  return (
    <View>
      <Modal
        visible={props.visible}
        animationType={props.animationType}
        transparent={props.transparent}
        pressHandler={props.pressHandler}>
        <TouchableOpacity
          style={styles.confirmModal}
          onPress={() => props.pressHandler(false)}>
          <TouchableWithoutFeedback>{props.children}</TouchableWithoutFeedback>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  confirmModal: {
    flex: 1,
    backgroundColor: Colors.transparent,
    justifyContent: 'center',
  },
});
