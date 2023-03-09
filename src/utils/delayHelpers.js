import {Animated} from 'react-native';

export const delay = (callBack = () => null, time = 100) => {
  Animated.timing(new Animated.Value(0), {
    toValue: 1,
    duration: time,
    useNativeDriver: true,
  }).start(callBack);
};
