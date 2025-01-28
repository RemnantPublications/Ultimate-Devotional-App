import React from 'react';
import {useDispatch} from 'react-redux';
import {View, Text, TouchableOpacity, Alert} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {AuthContext} from '../../Navigation/authProvider';

import {styles} from './styles';
import {useTheme} from '../../../theme/ThemeProvider';
import {removeAllHighlight} from '../../../Redux/actions/action';

export const HighlightHeader = () => {
  const {colors} = useTheme();
  const dispatch = useDispatch();
  const {user} = React.useContext(AuthContext);

  const removeAllHighlightsFromFirestore = async () => {
    try {
      const userId = 'your-user-id'; // Replace this with the actual user ID
      const highlightsCollection = firestore()
        .collection('usersData')
        .doc(user.uid)
        .collection('highlights');

      const snapshot = await highlightsCollection.get();

      // Batch delete to efficiently remove all documents
      const batch = firestore().batch();
      snapshot.docs.forEach(doc => batch.delete(doc.ref));
      await batch.commit();

      console.log('All highlights deleted from Firestore');
    } catch (error) {
      console.error('Error removing all highlights from Firestore:', error);
    }
  };

  const confirmAndRemoveAllHighlights = () => {
    Alert.alert(
      'Confirm Deletion',
      'Are you sure you want to remove all highlights? This action cannot be undone.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            await removeAllHighlightsFromFirestore();
            dispatch(removeAllHighlight(0));
          },
        },
      ],
    );
  };

  return (
    <View style={styles.headerContent}>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={confirmAndRemoveAllHighlights}>
        <Text style={styles.removeText}>Remove All</Text>
      </TouchableOpacity>
    </View>
  );
};
