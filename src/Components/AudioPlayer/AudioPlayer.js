import React from 'react';
import {Slider} from '@miblanchard/react-native-slider';
import {useIsFocused} from '@react-navigation/native';
import Ionicon from 'react-native-vector-icons/Ionicons';
import crashlytics from '@react-native-firebase/crashlytics';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {View, Text, TouchableOpacity, ActivityIndicator} from 'react-native';
import TrackPlayer, {
  State,
  RepeatMode,
  usePlaybackState,
  useProgress,
} from 'react-native-track-player';

import {styles} from './styles';
import Colors from '../../Styles/Colors';
import {useTheme} from '../../theme/ThemeProvider';
import {SliderValue} from '../../constants/Slider';
import {
  setupPlayer,
  handlePlayPause,
  handleStopPlayer,
  addTracks,
} from '../../utils/trackPlayerHelper';

export const AudioPlayer = ({
  item,
  pressHandler,
  bookTitle,
  date,
  bookCover,
}) => {
  const playbackState = usePlaybackState();
  const audioProgress = useProgress();
  const {colors, isDark} = useTheme();
  const [repeat, setRepeat] = React.useState('off');
  const [loading, setLoading] = React.useState(false);

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

  const audioLoadingHandler = action => {
    setLoading(action);
  };

  const isFocused = useIsFocused();
  React.useEffect(() => {
    if (isFocused) {
      setupPlayer;
      crashlytics().log('Setup Player.');
      addTracks(bookTitle, date, audioLoadingHandler, item.title, bookCover);
      crashlytics().log('Add Tracks.');
    }

    return () => {
      setLoading(false);
      setRepeat('off');
    };
  }, [isFocused]);

  const repeatIcon = () => {
    if (repeat == 'off') {
      return 'repeat';
    }
    if (repeat == 'track') {
      return 'repeat-once';
    }
  };

  const repeatHandler = () => {
    if (repeat == 'off') {
      TrackPlayer.setRepeatMode(RepeatMode.Track);
      setRepeat('track');
    }
    if (repeat == 'track') {
      TrackPlayer.setRepeatMode(RepeatMode.Off);
      setRepeat('off');
    }
  };

  return (
    <View style={styles.playerContainer}>
      <View style={[styles.content, darkMode.background]}>
        <TouchableOpacity
          style={{paddingHorizontal: 7}}
          onPress={() => {
            handleStopPlayer(), pressHandler(false);
          }}>
          <Ionicon name="close-circle" size={20} color={Colors.gray600} />
        </TouchableOpacity>

        <View style={styles.titleSection}>
          <Text style={styles.playerTitle}>{item.title}</Text>
          <Text style={styles.bookTitle}>{bookTitle}</Text>
        </View>

        <View style={styles.actionButtons}>
          <TouchableOpacity onPress={repeatHandler}>
            <Icon name={repeatIcon()} size={30} color={Colors.gray800} />
          </TouchableOpacity>

          {loading ? (
            <ActivityIndicator
              size="large"
              color={Colors.gray800}
              style={styles.loadingIndicator}
            />
          ) : (
            <TouchableOpacity onPress={() => handlePlayPause(playbackState)}>
              {playbackState == State.Playing ? (
                <Ionicon name="pause" size={40} color={Colors.gray800} />
              ) : (
                <Ionicon name="play" size={40} color={Colors.gray800} />
              )}
            </TouchableOpacity>
          )}
        </View>
      </View>
      <View style={styles.sliderView}>
        <Slider
          style={styles.slider}
          minimumValue={SliderValue.minimum}
          maximumValue={audioProgress.duration}
          minimumTrackTintColor={Colors.themeBlue}
          maximumTrackTintColor={isDark ? Colors.white : Colors.gray300}
          thumbTintColor={Colors.gray800}
          value={audioProgress.position}
          renderThumbComponent={() => <View></View>}
          disabled
        />
      </View>
    </View>
  );
};
