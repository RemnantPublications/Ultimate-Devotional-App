import {Alert} from 'react-native';
import storage from '@react-native-firebase/storage';
import crashlytics from '@react-native-firebase/crashlytics';
import TrackPlayer, {State, Capability} from 'react-native-track-player';

import {delay} from './delayHelpers';
import {BookTitles, AudioDir, fetchAudioBooks} from '../constants/Books';

export const setupPlayer = async () => {
  await TrackPlayer.setupPlayer({});
  crashlytics().log('SetupPlayer Helper.');

  await TrackPlayer.updateOptions({
    stopWithApp: true,
    capabilities: [Capability.Play, Capability.Pause, Capability.Stop],
    compactCapabilities: [Capability.Play, Capability.Pause],
  });
};

export const addTracks = async (
  bookTitle,
  date,
  audioLoadingHandler,
  chapterTitle,
  bookCover,
) => {
  try {
    crashlytics().log('Add Tracks Helper.');
    audioLoadingHandler(true);
    //Note: getBookPath from firebase storage
    const firebasePath = getBookRef(bookTitle, date);
    const storageRef = storage().ref(firebasePath);

    const urlRef = await storageRef.getDownloadURL().then(
      url => {
        crashlytics().log('Get audio url from Firebase.');
        return url;
      },
      error => {
        crashlytics().log('Erro fetching url from Firebase.');
        Alert.alert('No audio file found.');
      },
    );

    let currentTrack;
    if (urlRef) {
      await TrackPlayer.add({
        id: 1,
        title: `${chapterTitle}`,
        artist: `${bookTitle}`,
        artwork: `${bookCover}`,
        url: urlRef,
      });
      crashlytics().log('Add Tracks if url is fetched.');

      currentTrack = await TrackPlayer.getCurrentTrack();
    }

    if (currentTrack !== null) {
      await TrackPlayer.play();
      delay(() => audioLoadingHandler(false), 4500);
    }
  } catch (err) {
    crashlytics().recordError('Add Tracks Helper.', err);
    Alert.alert('Error playing audio.');
    audioLoadingHandler(false);
  }
};

export const handlePlayPause = async playbackState => {
  const currentTrack = await TrackPlayer.getCurrentTrack();

  if (currentTrack !== null) {
    if (playbackState === State.Paused) {
      await TrackPlayer.play();
      crashlytics().log('Play Tracks');
    } else {
      await TrackPlayer.pause();
      crashlytics().log('Pause Tracks.');
    }
  }
};

export const handleStopPlayer = async () => {
  try {
    await TrackPlayer.pause();
    await TrackPlayer.reset();
    await TrackPlayer.stop();
    await TrackPlayer.destroy();
  } catch (err) {}
};

const getBookRef = (bookTitle, date) => {
  let audioDirectory;
  // let bookDirectory;
  if (bookTitle === BookTitles.Bridegroom) {
    // bookDirectory = fetchAudioBooks.BrideGroom;
    audioDirectory = AudioDir.Bridegroom;
  } else if (bookTitle === BookTitles.ItFinished) {
    // bookDirectory = fetchAudioBooks.ItFinished;
    audioDirectory = AudioDir.ItFinished;
  } else if (bookTitle === BookTitles.JourneyPromised) {
    // bookDirectory = fetchAudioBooks.JourneyPromised;
    audioDirectory = AudioDir.JourneyPromised;
  }
  const todayDate = date;

  // return `Devotional_Audio/${bookDirectory}/${audioDirectory}-${todayDate}.mp3`;
  crashlytics().log('Get book folder ref helper.');
  return `${audioDirectory}/${audioDirectory}-${todayDate}.mp3`;
};
