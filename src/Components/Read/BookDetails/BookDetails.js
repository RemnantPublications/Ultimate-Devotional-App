import React from 'react';
import {useDispatch} from 'react-redux';
import {View, Text, Image, ScrollView, Dimensions} from 'react-native';

import Images from '@constants/Images';
import {styles} from '@screens/Read/styles';
import {TextSize} from '@constants/TextSize';
import {useTheme} from '@theme/ThemeProvider';
import {selectBookmark} from '@actions/action';
import {checkBookmarked} from '@actions/action';
import {onScrollHandler} from '@utils/tabbarUtils';
import {RenderText} from './RenderText/RenderText';

const {width} = Dimensions.get('window');

export const BookDetails = ({
  item,
  bookCover,
  bookTitle,
  navigation,
  showbookmark,
  changeTextSize,
}) => {
  const {colors} = useTheme();
  const dispatch = useDispatch();

  const formatTextSize = {
    bookTitleText: {
      fontSize: TextSize.titleText + changeTextSize,
      lineHeight: 25 + changeTextSize,
    },
    bookBibleText: {
      fontSize: TextSize.subTitleText + changeTextSize,
      lineHeight: TextSize.defaultLineHeight + changeTextSize,
    },
    referenceText: {
      fontSize: TextSize.mainText + changeTextSize,
      lineHeight: TextSize.defaultLineHeight + changeTextSize,
    },
  };

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

  const textOnpressHandler = text => {
    const bookmarkText = text;
    dispatch(selectBookmark(bookmarkText, item.title, bookTitle, bookCover));
    showbookmark(true);
    dispatch(checkBookmarked());
  };

  const scrollHandler = event => {
    onScrollHandler(navigation, event);
    showbookmark(false);
  };

  return (
    <View style={[styles.content, darkMode.background, {width}]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        onScroll={event => scrollHandler(event)}
        scrollEventThrottle={16}
        bounces={false}>
        <View style={styles.bookDetailContent}>
          <Text style={[styles.bookTitleText, formatTextSize.bookTitleText]}>
            {item.title}
          </Text>

          <RenderText
            content={item.bibleText}
            onPress={textOnpressHandler}
            style={[styles.bookBibleText, formatTextSize.bookBibleText]}
          />

          <Text style={[styles.bookBibleText, formatTextSize.bookBibleText]}>
            {item.bibleReference}
          </Text>

          {item.mainText.map((itemText, index) => (
            <RenderText
              content={itemText}
              onPress={textOnpressHandler}
              key={index}
              style={[
                styles.bookMainText,
                formatTextSize.bookBibleText,
                darkMode.text,
              ]}
            />
          ))}

          <Text
            style={[
              styles.referenceText,
              formatTextSize.referenceText,
              darkMode.text,
            ]}>
            {item.mainTextReference}
          </Text>

          <Image
            source={Images.Divider}
            style={[styles.dividerImg, darkMode.image]}
          />

          <Text style={[styles.reflectionText, formatTextSize.referenceText]}>
            Reflection:{' '}
          </Text>

          <RenderText
            content={item.reflectionText}
            onPress={textOnpressHandler}
            style={[
              styles.bibleReflection,
              formatTextSize.referenceText,
              darkMode.text,
            ]}
          />

          <Text
            style={[
              styles.referenceText,
              formatTextSize.referenceText,
              darkMode.text,
            ]}>
            {item.reflectionReference}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};
