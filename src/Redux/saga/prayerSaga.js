import {put, select, takeLatest} from 'redux-saga/effects';

import {
  ADD_PRAYER,
  UPDATE_PRAYER,
  REMOVE_PRAYER,
  TOGGLE_PRAYER,
  EDIT_PRAYER,
  ERROR,
} from '../actions/actionTypes';
import moment from 'moment';

// Note: Add Prayer
export function* addItem(action) {
  try {
    let request = action;
    let tempList = yield select(state => state.getPrayer.list);
    let list = [];
    list = list.concat(tempList);
    const tempObj = {};
    tempObj.id = moment().valueOf();
    tempObj.title = request.title;
    tempObj.description = request.description;
    tempObj.date = request.date;
    tempObj.completed = false;
    list.push(tempObj);

    yield put({
      type: UPDATE_PRAYER,
      data: list,
    });
  } catch (e) {
    yield put({type: ERROR});
  }
}

export function* addItemFlow() {
  yield takeLatest(ADD_PRAYER, addItem);
}

// Note: Toggle Prayer
export function* toggleItem(action) {
  try {
    let request = action.index;
    let tempList = yield select(state => state.getPrayer.list);
    let list = [];
    list = list.concat(tempList);
    let obj = list.find(item => item.id == request);
    obj.completed = !obj.completed;
    yield put({
      type: UPDATE_PRAYER,
      data: list,
    });
  } catch (err) {
    yield put({type: ERROR});
  }
}

export function* toggleItemFlow() {
  yield takeLatest(TOGGLE_PRAYER, toggleItem);
}

// Note: Edit Prayer
export function* editItem(action) {
  try {
    let request = action;
    let tempList = yield select(state => state.getPrayer.list);
    let list = [];
    list = list.concat(tempList);
    let obj = list.find(item => item.id == request.index);
    obj.title = request.title;
    obj.description = request.description;
    obj.date = request.date;

    yield put({
      type: UPDATE_PRAYER,
      data: list,
    });
  } catch (err) {
    yield put({type: ERROR});
  }
}

export function* editItemFlow() {
  yield takeLatest(EDIT_PRAYER, editItem);
}

// Note: Delete Prayer
export function* removeItem(action) {
  try {
    let request = action.index;
    let tempList = yield select(state => state.getPrayer.list);
    let list = [];
    list = tempList.filter(item => item.id !== request);

    yield put({
      type: UPDATE_PRAYER,
      data: list,
    });
  } catch (err) {
    yield put({type: ERROR});
  }
}

export function* removeItemFlow() {
  yield takeLatest(REMOVE_PRAYER, removeItem);
}
