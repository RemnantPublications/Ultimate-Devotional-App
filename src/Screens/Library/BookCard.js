import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Colors from '../../Styles/Colors';

const BookCard = ({book, isNew}) => {
  return (
    <View style={styles.bookSection}>
      <View style={styles.imageContainer}>
        {isNew && (
          <View style={styles.ribbon}>
            <Text style={styles.ribbonText}>NEW DEVOTIONAL</Text>
          </View>
        )}
        <Image source={{uri: book.image}} style={styles.bookImg} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  bookSection: {
    paddingHorizontal: 5,
    paddingVertical: 10,
  },
  imageContainer: {
    position: 'relative',
  },
  ribbon: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: Colors.primary, // your theme color (e.g. blue)
    paddingVertical: 3,
    paddingHorizontal: 6,
    borderRadius: 3,
    zIndex: 2,
  },
  ribbonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 11,
  },
  bookImg: {
    height: hp('25%'),
    width: wp('30%'),
    borderRadius: 5,
    resizeMode: 'contain',
    backgroundColor: Colors.gray300,
  },
});

export default BookCard;
