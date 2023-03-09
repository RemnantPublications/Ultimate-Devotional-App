import React from 'react';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {View, Text, TouchableOpacity, Modal, StyleSheet} from 'react-native';

import Colors from '@styles/Colors';
import {StackScreens} from '@constants/Constants';

export const CouponInfoModal = ({
  modalVisible,
  closeModal,
  description,
  success,
  expire,
}) => {
  const navigation = useNavigation();

  const subscribeHandler = () => {
    closeModal();
    navigation.navigate(StackScreens.PaywallScreen);
  };

  const successHandler = () => {
    closeModal();
    navigation.navigate('Library');
  };

  const expireHandler = () => {
    closeModal();
    navigation.navigate(StackScreens.CouponScreen);
  };
  return (
    <Modal visible={modalVisible} animationType={'fade'} transparent={true}>
      <View style={styles.container}>
        <View style={styles.content}>
          <TouchableOpacity style={styles.cancelButton} onPress={closeModal}>
            <Icon name="close" size={25} color={Colors.black} />
          </TouchableOpacity>
          <View style={styles.desc}>
            <Text style={styles.descText}>{description}</Text>
          </View>

          <View style={styles.actionButtons}>
            {!success ? (
              <>
                {expire ? (
                  <TouchableOpacity onPress={expireHandler}>
                    <Text style={[styles.cancelText, {marginLeft: 0}]}>
                      Claim Coupon
                    </Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity onPress={closeModal}>
                    <Text style={styles.cancelText}>Try again</Text>
                  </TouchableOpacity>
                )}

                <TouchableOpacity onPress={subscribeHandler}>
                  <Text style={styles.actionText}>Subscribe</Text>
                </TouchableOpacity>
              </>
            ) : (
              <TouchableOpacity onPress={successHandler}>
                <Text style={[styles.actionText, {marginLeft: 0}]}>
                  Continue
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: Colors.transparent,
  },
  content: {
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
    marginHorizontal: 30,
    justifyContent: 'center',
    backgroundColor: Colors.white,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  desc: {
    marginBottom: 30,
    marginVertical: 15,
  },
  descText: {
    fontSize: 16,
    letterSpacing: 0.8,
    color: Colors.gray800,
  },
  actionText: {
    fontSize: 16,
    marginLeft: 50,
    color: Colors.themeBlue,
  },
  cancelText: {
    fontSize: 16,
  },
  cancelButton: {
    alignSelf: 'flex-end',
  },
});
