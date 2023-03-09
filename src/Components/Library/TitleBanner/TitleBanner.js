import React from 'react';
import {View, Image, Text} from 'react-native';

import {styles} from './styles';
import Images from '../../../constants/Images';

export const TitleBanner = ({title}) => {
  return (
    <View style={styles.content}>
      <Image source={Images.HalfLogo} style={styles.halflogoImg} />
      <Text style={styles.title} adjustsFontSizeToFit={true} numberOfLines={1}>{title}</Text>
    </View>
  );
};
