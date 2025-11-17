import React, {useEffect, useState} from 'react';
import Purchases from 'react-native-purchases';
import {
  View,
  Text,
  Alert,
  FlatList,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

import Global from '@styles/Global';
import Colors from '@styles/Colors';
import {useNavigation} from '@react-navigation/native';
import {useTheme} from '@theme/ThemeProvider';
import {Linking} from 'react-native';

export const PaywallScreen = () => {
  const [packages, setPackages] = useState([]);
  const {colors} = useTheme();
  const [selectedPlan, setSelectedPlan] = useState({
    index: null,
    productId: null,
  });
  const [loading, setLoading] = useState(false); // 🔹 Added loading state

  const navigation = useNavigation();

  useEffect(() => {
    console.log('Fetching available subscription packages...');

    const fetchPackages = async () => {
      try {
        const offerings = await Purchases.getOfferings();
        if (offerings.current) {
          console.log(
            'Available packages:',
            offerings.current.availablePackages,
          );
          setPackages(offerings.current.availablePackages);
        } else {
          console.log('No available packages found.');
        }
      } catch (error) {
        console.error('Error fetching subscriptions:', error);
        Alert.alert('Error', 'Could not fetch subscriptions');
      }
    };

    fetchPackages();
  }, []);

  const purchaseSubscription = async selectedPackage => {
    console.log('Attempting to purchase:', selectedPackage);
    setLoading(true); // 🔹 Show loading spinner

    try {
      const {customerInfo} = await Purchases.purchasePackage(selectedPackage);
      console.log('Purchase successful:', customerInfo);

      if (customerInfo.entitlements.active['Premium Access']) {
        Alert.alert('Success', 'Subscription activated!');
        navigation.navigate('Library');
      }
    } catch (error) {
      if (!error.userCancelled) {
        console.error('Purchase failed:', error);

        if (
          error.code === Purchases.PURCHASES_ERROR_CODE.PURCHASE_NOT_ALLOWED
        ) {
          Alert.alert('Purchase Not Allowed', 'You are already subscribed.');
        } else if (
          error.code === Purchases.PURCHASES_ERROR_CODE.RECEIPT_ALREADY_IN_USE
        ) {
          Alert.alert(
            'Subscription Exists',
            'You already have an active subscription.',
          );
        } else {
          Alert.alert('Purchase failed', error.message);
        }
      } else {
        console.log('User canceled the purchase');
      }
    }

    setLoading(false); // 🔹 Hide loading spinner after response
  };

  const restorePurchases = async () => {
    setLoading(true); // 🔹 Show loading when restoring purchases

    try {
      const restoredCustomerInfo = await Purchases.restorePurchases();
      console.log('Restored purchases:', restoredCustomerInfo);

      if (restoredCustomerInfo.entitlements.active['Premium Access']) {
        Alert.alert('Success', 'Your subscription has been restored!');
        navigation.navigate('Library');
      } else {
        Alert.alert(
          'No Active Subscription',
          'We could not find an active subscription for your account.',
        );
      }
    } catch (error) {
      console.error('Restore purchases failed:', error);
      Alert.alert('Error', 'Could not restore purchases.');
    }

    setLoading(false); // 🔹 Hide loading after restore
  };

  const ItemView = ({item, index}) => (
    <Pressable
      onPress={() => {
        console.log(
          `Plan selected: ${item.product.identifier} at index ${index}`,
        );
        setSelectedPlan({index, productId: item.identifier});
      }}>
      <View
        style={[
          styles.subscriptionContent,
          {
            backgroundColor:
              selectedPlan.index === index ? Colors.themeBlue : Colors.white,
          },
        ]}>
        <View>
          <Text style={styles.activePlanText(selectedPlan, index)}>
            {item.product.title}
          </Text>
          <Text
            style={[
              styles.activePlanText(selectedPlan, index),
              {fontSize: 12},
            ]}>
            {item.product.description}
          </Text>
        </View>
        <Text style={styles.activePlanText(selectedPlan, index)}>
          {item.product.priceString}
        </Text>
      </View>
    </Pressable>
  );

  if (packages.length > 0) {
    return (
      <View style={styles.container(colors)}>
        <FlatList
          data={packages}
          renderItem={ItemView}
          showsVerticalScrollIndicator={false}
        />
        <View style={styles.footer}>
          <View style={{marginBottom: 20, alignItems: 'center'}}>
            <Text style={{fontSize: 12, color: 'gray', textAlign: 'center'}}>
              By subscribing, you agree to our{' '}
              <Text
                style={{
                  color: Colors.themeBlue,
                  textDecorationLine: 'underline',
                }}
                onPress={() =>
                  Linking.openURL(
                    'https://remnantpublications.com/ultimate-devotional-app-privacy-terms-of-use',
                  )
                }>
                Terms of Use
              </Text>{' '}
              and{' '}
              <Text
                style={{
                  color: Colors.themeBlue,
                  textDecorationLine: 'underline',
                }}
                onPress={() =>
                  Linking.openURL(
                    'https://remnantpublications.com/ultimate-devotional-app-privacy-terms-of-use',
                  )
                }>
                Privacy Policy
              </Text>
              .
            </Text>
          </View>
          <TouchableOpacity
            style={styles.subscribeButton}
            onPress={() => {
              if (selectedPlan.index !== null) {
                console.log(
                  'Initiating purchase for:',
                  packages[selectedPlan.index],
                );
                purchaseSubscription(packages[selectedPlan.index]);
              } else {
                console.log('No plan selected.');
                Alert.alert(
                  'Error',
                  'Please select a subscription plan first.',
                );
              }
            }}
            disabled={selectedPlan.index === null || loading}>
            {loading ? (
              <ActivityIndicator size="small" color="#FFF" />
            ) : (
              <Text style={styles.buttonText}>Subscribe</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.restoreButton}
            onPress={restorePurchases}
            disabled={loading}>
            {loading ? (
              <ActivityIndicator size="small" color="#000" />
            ) : (
              <Text style={styles.restoreButtonText}>Restore Purchases</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <Text>Fetching Subscription, Please wait...</Text>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: colors => ({
    ...Global.container,
    padding: 10,
    backgroundColor: colors.background,
  }),
  subscriptionContent: {
    flex: 1,
    margin: 5,
    borderWidth: 1,
    borderRadius: 5,
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 10,
    justifyContent: 'space-between',
  },
  footer: {
    marginTop: 20,
  },
  subscribeButton: {
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    backgroundColor: Colors.themeBlue,
    marginBottom: -5,
  },
  restoreButton: {
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  restoreButtonText: {
    color: Colors.black,
    fontSize: 16,
    fontWeight: 'bold',
  },
  activePlanText: (selectedPlan, index) => ({
    color: selectedPlan.index === index ? Colors.white : Colors.black,
  }),
});
