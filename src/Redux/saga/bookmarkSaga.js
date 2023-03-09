import moment from 'moment';
import {put, select, takeLatest} from 'redux-saga/effects';

import {
  ADD_BOOKMARK,
  UPDATE_BOOKMARK,
  REMOVE_BOOKMARK,
  REMOVE_ALL_BOOKMARK,
  SELECT_BOOKMARK,
  UPDATE_SELECTED_BOOKMARK,
  ALREADY_BOOKMARKED,
} from '../actions/actionTypes';

import {checkBookmarkedSuccess} from '../actions/action';

export function* addItem(action) {
  try {
    let bookmark = action.value;
    let tempList = yield select(state => state.getBookmark.list);
    let list = [];
    list = list.concat(tempList);
    const tempObj = {};
    tempObj.id = moment().valueOf();
    tempObj.text = bookmark;
    tempObj.bookTitle = action.bookTitle;
    tempObj.chapterTitle = action.chapter;
    tempObj.bookCover = action.bookCover;
    tempObj.bookmarked = true;
    list.push(tempObj);

    yield put({
      type: UPDATE_BOOKMARK,
      data: list,
    });
  } catch (e) {}
}

export function* addBookmarkFlow() {
  yield takeLatest(ADD_BOOKMARK, addItem);
}

export function* removeItem(action) {
  try {
    let bookmark = action.index;
    let tempList = yield select(state => state.getBookmark.list);
    let list = tempList.filter(item => item.id !== bookmark);

    yield put({
      type: UPDATE_BOOKMARK,
      data: list,
    });
  } catch (e) {}
}

export function* removeBookmarkFlow() {
  yield takeLatest(REMOVE_BOOKMARK, removeItem);
}

export function* removeAllItem(action) {
  try {
    let bookmark = action.index;
    let tempList = yield select(state => state.getBookmark.list);
    let list = [];
    list = list.concat(tempList);
    list.splice(bookmark);

    yield put({
      type: UPDATE_BOOKMARK,
      data: list,
    });
  } catch (e) {}
}

export function* removeAllBookmarkFlow() {
  yield takeLatest(REMOVE_ALL_BOOKMARK, removeAllItem);
}

export function* selectedBookmark(action) {
  try {
    let bookmark = {};
    bookmark.text = action.value;
    bookmark.bookTitle = action.bookTitle;
    bookmark.chapterTitle = action.chapter;
    bookmark.bookCover = action.bookCover;

    yield put({
      type: UPDATE_SELECTED_BOOKMARK,
      data: bookmark,
    });
  } catch (e) {}
}

export function* selectedBookmarkFlow() {
  yield takeLatest(SELECT_BOOKMARK, selectedBookmark);
}

export function* checkBookmark(action) {
  try {
    const bookmarkText = yield select(state => state.getSelectedBookmark.text);
    const savedBookmark = yield select(state => state.getBookmark.list);

    const foundBookmark = savedBookmark.find(
      item => item.text == bookmarkText.text,
    );

    if (foundBookmark) {
      yield put(checkBookmarkedSuccess(true));
    } else {
      yield put(checkBookmarkedSuccess(false));
    }
  } catch (e) {
    console.log('error checking bookmark');
  }
}

export function* checkBookmarkFlow() {
  yield takeLatest(ALREADY_BOOKMARKED, checkBookmark);
}
