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
  addHighlightFlow,
  removeHighlightFlow,
  removeAllHighlightFlow,
} from './highlightSaga';
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
    fork(addHighlightFlow),
    fork(removeHighlightFlow),
    fork(removeAllHighlightFlow),
    fork(updateSubscriptionFlow),
    fork(updateActiveCouponFlow),
    fork(updateCouponExpireFlow),
  ]);
}
