import {all, fork} from 'redux-saga/effects';
import {
  addItemFlow,
  toggleItemFlow,
  editItemFlow,
  removeItemFlow,
} from './prayerSaga';
import {
  addBookmarkFlow,
  removeBookmarkFlow,
  removeAllBookmarkFlow,
  selectedBookmarkFlow,
  checkBookmarkFlow,
} from './bookmarkSaga';
import {
  updateSubscriptionFlow,
  updateActiveCouponFlow,
  updateCouponExpireFlow,
} from './subscriptionSaga';

export default function* rootSaga() {
  yield all([
    fork(addItemFlow),
    fork(editItemFlow),
    fork(toggleItemFlow),
    fork(removeItemFlow),
    fork(addBookmarkFlow),
    fork(checkBookmarkFlow),
    fork(removeBookmarkFlow),
    fork(selectedBookmarkFlow),
    fork(removeAllBookmarkFlow),
    fork(updateSubscriptionFlow),
    fork(updateActiveCouponFlow),
    fork(updateCouponExpireFlow),
  ]);
}
