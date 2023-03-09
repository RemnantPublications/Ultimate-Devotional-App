import React from 'react';
import IAP from 'react-native-iap';
import {
  View,
  Text,
  Alert,
  FlatList,
  Platform,
  Pressable,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import Global from '@styles/Global';
import Colors from '@styles/Colors';
import {useTheme} from '@theme/ThemeProvider';

const items = Platform.select({
  ios: ['ud_199_m', 'ud_1600_y'],
  android: ['ud_199_m', 'ud_1599_y'],
});

let purchaseUpdateListener;
let purchaseErrorListener;

export const PaywallScreen = () => {
  const [packages, setPackages] = React.useState([]);
  const {colors} = useTheme();
  const [selectedPlan, setSelectedPlan] = React.useState({
    index: null,
    productId: null,
  });

  // Note: Dark mode scheme
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

  React.useEffect(() => {
    IAP.initConnection()
      .catch(() => {
        Alert.alert('error connecting to store...');
      })
      .then(() => {
        IAP.getSubscriptions(items)
          .catch(() => {
            Alert.alert('error finding items');
          })
          .then(res => {
            setPackages(res);
          });
      });

    // Note: Purchase Module
    purchaseUpdateListener = IAP.purchaseUpdatedListener(async purchase => {
      const receipt = purchase.transactionReceipt;
      if (receipt) {
        try {
          // validate(receipt);
          const ackResult = await IAP.finishTransaction(purchase);
          console.info('ackResult: ', ackResult);
        } catch (e) {
          console.warn('ackErr: ', e.message);
        }
      }
    });

    return () => {
      if (purchaseUpdateListener) {
        purchaseUpdateListener.remove();
        purchaseUpdateListener = null;
      }

      if (purchaseErrorListener) {
        purchaseErrorListener.remove();
        purchaseErrorListener = null;
      }

      IAP.endConnection();
    };
  }, []);

  const ItemView = ({item, index}) => {
    return (
      <Pressable
        onPress={() =>
          setSelectedPlan({index: index, productId: item.productId})
        }>
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
              {item.title}
            </Text>
            <Text
              style={[
                styles.activePlanText(selectedPlan, index),
                {fontSize: 12},
              ]}>
              {item.description}
            </Text>
          </View>
          <Text style={styles.activePlanText(selectedPlan, index)}>
            {item.localizedPrice}
          </Text>
        </View>
      </Pressable>
    );
  };

  if (packages?.length > 0) {
    return (
      <View style={styles.container(colors)}>
        <FlatList
          data={packages}
          renderItem={ItemView}
          showsVerticalScrollIndicator={false}
        />

        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.cancelNotificationButton}
            onPress={() => IAP.requestSubscription(selectedPlan.productId)}>
            <Text>Subscribe</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <Text> Fetching Subscription Please wait....</Text>
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
    flex: 0.2,
  },
  cancelNotificationButton: {
    padding: 20,
    borderWidth: 1,
    borderRadius: 10,
    alignItems: 'center',
    borderColor: Colors.gray300,
    backgroundColor: Colors.gray300,
  },
  activePlanText: (selectedPlan, index) => ({
    color: selectedPlan.index === index ? Colors.white : Colors.black,
  }),
});
