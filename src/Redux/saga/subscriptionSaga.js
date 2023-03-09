import {put} from 'redux-saga/effects';

import {
  ACTIVE_COUPON,
  USER_SUBSCRIBED,
  COUPON_EXPIRE,
} from '../actions/actionTypes';

export function* updateSubscriptionFlow(action) {
  try {
    yield put({
      type: USER_SUBSCRIBED,
      value: action.value,
    });
  } catch (e) {
    console.log('saga error: ', e);
  }
}

export function* updateActiveCouponFlow(action) {
  try {
    yield put({
      type: ACTIVE_COUPON,
      value: action.value,
    });
  } catch (e) {
    console.log('saga error: ', e);
  }
}

export function* updateCouponExpireFlow(action) {
  try {
    yield put({
      type: COUPON_EXPIRE,
      value: action.value,
    });
  } catch (e) {
    console.log('coupon expire error: ', e);
  }
}
