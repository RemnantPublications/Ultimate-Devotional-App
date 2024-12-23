import {combineReducers} from 'redux';
import getPrayer from './list';
import {getBookmark, getSelectedBookmark, checkBookmark} from './bookmark';
import {getHighlight} from './highlight';
import {isSubscribedReducer} from './subscription';

const rootReducer = combineReducers({
  getPrayer,
  getBookmark,
  checkBookmark,
  getHighlight,
  getSelectedBookmark,
  isSubscribedReducer,
});

export default rootReducer;
