import React from 'react';
import {View, Text, FlatList, Dimensions, ScrollView} from 'react-native';

import {styles} from './styles';
import Global from '../../Styles/Global';
import {useTheme} from '../../theme/ThemeProvider';

const {width} = Dimensions.get('window');

export const EGWhieScreen = ({route}) => {
  const bookData = route.params.bookData.data;
  const {colors, isDark} = useTheme();

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

  const ItemView = ({item, index}) => {
    return (
      <View style={[styles.content, darkMode.background, {width}]} key={index}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={styles.titleText}>{item.title}</Text>
          {item.passages.map((item, index) => {
            return (
              <View key={index}>
                <Text style={[styles.mainText, darkMode.text]}>{item}</Text>
              </View>
            );
          })}
        </ScrollView>
      </View>
    );
  };

  const getItemLayout = (data, index) => {
    return {length: width, offset: width * index, index};
  };

  return (
    <View style={Global.container}>
      <FlatList
        data={bookData.chapters}
        renderItem={ItemView}
        pagingEnabled
        horizontal
        showsHorizontalScrollIndicator={false}
        getItemLayout={getItemLayout}
        initialNumToRender={2}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};
