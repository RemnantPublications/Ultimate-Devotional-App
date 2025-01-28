import firestore from '@react-native-firebase/firestore';
import {setHighlight} from '@actions/action'; // Action to store highlights in Redux

const fetchUserHighlights = async userId => {
  try {
    const highlightsSnapshot = await firestore()
      .collection('usersData')
      .doc(userId)
      .collection('highlights')
      .get();

    const highlights = highlightsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    // console.log('Highlights fetched:', JSON.stringify(highlights, null, 2));
    return highlights;
  } catch (error) {
    console.error('Error fetching highlights:', error);
    return [];
  }
};

export const onUserLogin = async (user, dispatch) => {
  if (user && user.uid) {
    const highlights = await fetchUserHighlights(user.uid);
    //console.log('Dispatched Highlights:', highlights);
    // Dispatch the highlights to Redux

    try {
      dispatch(setHighlight(highlights));
      console.log('SET_HIGHLIGHT dispatched successfully'); // This should show if dispatch is called.
    } catch (error) {
      console.error('Error dispatching SET_HIGHLIGHT:', error);
    }
  }
};
