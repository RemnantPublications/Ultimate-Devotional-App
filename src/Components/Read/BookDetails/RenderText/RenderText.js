import React, {useState} from 'react';
import {Text, Alert, View, TextInput, TouchableOpacity} from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import {SelectableText} from '@rob117/react-native-selectable-text';
import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';
import {addHighlight} from '@actions/action';
import firestore from '@react-native-firebase/firestore';
import {AuthContext} from '@navigation/authProvider';
import {PopUp} from '@components/Modal/Modal';
import {styles} from './styles';

export const RenderText = ({
  content,
  devotionalId,
  devotionalDay,
  devotionalTitle,
  devotionalCover,
  sectionTitle, // Title for the current section (e.g., 'bibleText', 'mainText')
  paragraphIndex, // Index for paragraph within 'mainText'
  onPress,
  ...props
}) => {
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [selectedColor, setSelectedColor] = useState('#FFFF00'); // Default yellow
  const [note, setNote] = useState('');
  const [currentSelection, setCurrentSelection] = useState(null);
  const [currentSelectionText, setCurrentSelectionText] = useState('');
  const dispatch = useDispatch();

  const {user} = React.useContext(AuthContext);

  // Ensure highlights are kept for each section separately
  const highlights = useSelector(state => state.getHighlight.list || []);

  const colors = ['#FFEB3B', '#FFCDD2', '#FFAB91', '#C8E6C9', '#D1C4E9'];

  const handleCopy = selectedText => {
    Clipboard.setString(selectedText);
  };

  const handleBookmark = selectedText => {
    if (onPress) {
      onPress(selectedText); // Trigger the parent component's handler for bookmarks
    }
  };

  const handleHighlight = (selectionStart, selectionEnd, selectedText) => {
    setCurrentSelection({start: selectionStart, end: selectionEnd});
    setCurrentSelectionText(selectedText);
    setPopupVisible(true);
  };

  const saveHighlight = async () => {
    if (!user) {
      console.error('User is not authenticated');
      return;
    }

    console.log('Authenticated User UID:', user.email); // Log the user UID

    // Construct the highlight object
    const highlightData = {
      text: currentSelectionText,
      start: currentSelection.start,
      end: currentSelection.end,
      color: selectedColor,
      note,
      devotionalId,
      devotionalTitle,
      devotionalDay,
      devotionalCover,
      sectionTitle, // Save section title as part of the highlight
      paragraphIndex,
      email: user.email,
    };

    dispatch(
      addHighlight({
        text: currentSelectionText,
        start: currentSelection.start,
        end: currentSelection.end,
        color: selectedColor,
        note,
        devotionalId,
        devotionalTitle,
        devotionalDay,
        devotionalCover,
        sectionTitle, // Save section title as part of the highlight
        paragraphIndex,
      }),
    );

    try {
      // Dynamically create the 'highlights' collection under the 'usersData/{userId}'
      const highlightRef = await firestore()
        .collection('usersData') // Using usersData as the collection
        .doc(user.uid) // Use the authenticated user's UID as the document ID
        .collection('highlights') // Subcollection for highlights
        .add(highlightData); // Add the new highlight document to the collection

      console.log('Highlight saved to Firestore with ID:', highlightRef.id);
    } catch (error) {
      console.error('Error saving highlight to Firestore:', error);
    }

    // Close the popup after saving
    closePopup();
  };

  const closePopup = () => {
    setPopupVisible(false);
    setNote('');
    setSelectedColor('#FFFF00');
    setCurrentSelection(null);
    setCurrentSelectionText('');
  };

  const handleLookUp = async word => {
    word = word.trim();
    try {
      const response = await axios.get(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`,
      );
      const definition =
        response.data[0]?.meanings[0]?.definitions[0]?.definition;

      if (definition) {
        Alert.alert(`Definition of ${word}`, definition);
      } else {
        Alert.alert(
          'No definition found',
          `Could not find a definition for ${word}`,
        );
      }
    } catch (error) {
      Alert.alert(
        'No definition found',
        `Could not find a definition for ${word}`,
      );
    }
  };

  // Filter highlights for this specific devotional and section (e.g., 'bibleText', 'mainText', etc.)
  const sectionHighlights = highlights.filter(
    highlight =>
      highlight.devotionalId === devotionalId &&
      highlight.sectionTitle === sectionTitle &&
      (sectionTitle === 'mainText'
        ? highlight.paragraphIndex === paragraphIndex
        : true),
  );

  const getHighlightedText = () => {
    if (!sectionHighlights.length) {
      return content;
    }

    let parts = [];
    let lastIndex = 0;

    sectionHighlights.forEach(({start, end, color}, index) => {
      // Adjust start and end positions relative to the content
      const localStart = start - lastIndex; // Offset by the previous text length
      const localEnd = end - lastIndex;

      if (localStart > 0) {
        parts.push(content.slice(lastIndex, start)); // Unhighlighted text
      }

      // Add the highlighted text
      parts.push(
        <Text key={`highlight-${index}`} style={{backgroundColor: color}}>
          {content.slice(localStart, localEnd)} {/* Highlighted text */}
        </Text>,
      );

      lastIndex = end; // Update the last index to the end of the current selection
    });

    // Add the remaining unhighlighted text
    if (lastIndex < content.length) {
      parts.push(content.slice(lastIndex)); // Remaining unhighlighted text
    }

    return parts;
  };

  const child = <Text {...props}>{getHighlightedText(content)}</Text>;

  return (
    <>
      <SelectableText
        menuItems={['Copy', 'Highlight', 'Bookmark', 'LookUp']}
        textComponentProps={{children: child}}
        onSelection={({eventType, content, selectionStart, selectionEnd}) => {
          if (eventType === 'Copy') {
            handleCopy(content);
          } else if (eventType === 'Highlight') {
            handleHighlight(selectionStart, selectionEnd, content);
          } else if (eventType === 'LookUp') {
            handleLookUp(content);
          } else if (eventType === 'Bookmark') {
            handleBookmark(content);
          }
        }}
      />

      {/* Highlight Popup */}
      <PopUp
        visible={isPopupVisible}
        pressHandler={setPopupVisible}
        animationType="slide"
        transparent={true}>
        <View style={styles.popupContent}>
          <Text style={styles.popupTitle}>Add Highlight</Text>

          {/* Color Picker */}
          <View style={styles.colorPicker}>
            {colors.map((color, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.colorCircle,
                  {
                    backgroundColor: color,
                    borderWidth: selectedColor === color ? 2 : 0,
                  },
                ]}
                onPress={() => setSelectedColor(color)}
              />
            ))}
          </View>

          {/* Note Input */}
          <Text style={styles.subtitle}>Note: (Optional)</Text>
          <TextInput
            style={styles.noteInput}
            placeholder="Write your note here..."
            value={note}
            onChangeText={setNote}
            multiline
          />

          {/* Action Buttons */}
          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.saveButton} onPress={saveHighlight}>
              <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </PopUp>
    </>
  );
};
