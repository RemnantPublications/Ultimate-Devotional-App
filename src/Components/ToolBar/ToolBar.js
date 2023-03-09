import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import styles from './styles';
import Colors from '../../Styles/Colors';
import Images from '../../constants/Images';
import {TextSize} from '../../constants/TextSize';
import {useTheme} from '../../theme/ThemeProvider';
import {Bookmark} from '../Read/Bookmark/Bookmark';

export const ToolBar = ({
  calendarPressHandler,
  displayDate,
  trackPressHandler,
  ontextSizeValueChange,
  changeTextSize,
  showBookmark,
  bookmarkHandler,
}) => {
  const {colors, isDark} = useTheme();
  const [displaySlider, setDisplaySlider] = React.useState(false);

  const darkMode = {
    background: {
      backgroundColor: colors.background,
    },
    content: {
      backgroundColor: colors.content,
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
    primary: {
      backgroundColor: colors.primary,
    },
  };

  const displaySilderHandler = () => {
    setDisplaySlider(!displaySlider);
  };

  const increaseTextSize = () => {
    if (changeTextSize == TextSize.maxValue) {
      return;
    }
    ontextSizeValueChange(changeTextSize + TextSize.incTextSize);
  };

  const decreaseTextSize = () => {
    if (changeTextSize == TextSize.minValue) {
      return;
    }
    ontextSizeValueChange(changeTextSize - TextSize.incTextSize);
  };

  return (
    <View style={[{elevation: 5}, darkMode.content]}>
      {!showBookmark ? (
        <View style={[styles.content, darkMode.content]}>
          <View style={styles.calendarSection}>
            <TouchableOpacity
              style={[styles.calendarButton, darkMode.background]}
              onPress={() => calendarPressHandler(true)}>
              <Text style={[styles.calendarButtonText, darkMode.text]}>
                {displayDate}
              </Text>
              <Icon
                name="arrow-drop-down"
                size={20}
                color={isDark ? 'white' : 'black'}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.textFormat}>
            <TouchableOpacity onPress={() => displaySilderHandler()}>
              <Icon
                name="text-format"
                size={30}
                color={isDark ? 'white' : 'black'}
              />
            </TouchableOpacity>
          </View>

          {displaySlider && (
            <View style={[styles.sliderView, darkMode.modal]}>
              <TouchableOpacity
                style={styles.increaseButton}
                onPress={() => increaseTextSize()}>
                <Icon name="add" size={25} color={Colors.themeBlue} />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.decreaseButton}
                onPress={() => decreaseTextSize()}>
                <MaterialCommunityIcons
                  name="minus"
                  size={25}
                  color={Colors.themeBlue}
                />
              </TouchableOpacity>
            </View>
          )}

          <TouchableOpacity
            onPress={() => trackPressHandler(true)}
            style={styles.speakerIcon}>
            <Image
              source={Images.SpeakerIcon}
              style={[styles.speakerImg, darkMode.image]}
            />
          </TouchableOpacity>
        </View>
      ) : (
        <Bookmark bookmarkHandler={bookmarkHandler} />
      )}
    </View>
  );
};
