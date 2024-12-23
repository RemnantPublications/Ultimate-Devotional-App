import moment from 'moment';
import {put, select, takeLatest} from 'redux-saga/effects';

import {
  ADD_HIGHLIGHT,
  UPDATE_HIGHLIGHT,
  REMOVE_HIGHLIGHT,
  REMOVE_ALL_HIGHLIGHT,
} from '../actions/actionTypes';

export function* addItem(action) {
  try {
    // Extract individual values from action payload (which is an object)
    const {
      text,
      start,
      end,
      color,
      note,
      devotionalId,
      devotionalTitle,
      devotionalDay,
      devotionalCover,
      sectionTitle,
      paragraphIndex,
    } = action;

    // Get the current list of highlights from the state
    const tempList = yield select(state => state.getHighlight.list);
    let list = [...tempList]; // Copy the existing list to avoid mutating the original state

    // Create a new object for the highlight with a unique ID
    const tempObj = {
      id: moment().valueOf(), // Unique ID based on current timestamp
      text, // Highlighted text
      start, // Start position of the highlight
      end, // End position of the highlight
      color, // Highlight color
      note,
      devotionalId,
      devotionalTitle,
      devotionalDay,
      devotionalCover,
      sectionTitle, // Note associated with the highlight
      paragraphIndex,
    };

    // Add the new highlight to the list
    list.push(tempObj);

    // Dispatch the updated list of highlights
    yield put({
      type: UPDATE_HIGHLIGHT,
      data: list,
    });
  } catch (e) {
    console.error('Error adding highlight:', e);
  }
}

export function* addHighlightFlow() {
  // Listen for the ADD_HIGHLIGHT action and trigger the addItem saga
  yield takeLatest(ADD_HIGHLIGHT, addItem);
}

export function* removeItem(action) {
  try {
    let highlight = action.index;
    let tempList = yield select(state => state.getHighlight.list);
    let list = tempList.filter(item => item.id !== highlight);

    yield put({
      type: UPDATE_HIGHLIGHT,
      data: list,
    });
  } catch (e) {
    console.error('Error removing highlight:', e);
  }
}

export function* removeHighlightFlow() {
  yield takeLatest(REMOVE_HIGHLIGHT, removeItem);
}

export function* removeAllItem(action) {
  try {
    let highlight = action.index;
    let tempList = yield select(state => state.getHighlight.list);
    let list = [];
    list = list.concat(tempList);
    list.splice(highlight);

    yield put({
      type: UPDATE_HIGHLIGHT,
      data: list,
    });
  } catch (e) {
    console.error('Error removing all highlights:', e);
  }
}

export function* removeAllHighlightFlow() {
  yield takeLatest(REMOVE_ALL_HIGHLIGHT, removeAllItem);
}
