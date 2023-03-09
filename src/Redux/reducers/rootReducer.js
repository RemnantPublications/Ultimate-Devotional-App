import {combineReducers} from 'redux';
import getPrayer from './list';
import {getBookmark, getSelectedBookmark, checkBookmark} from './bookmark';
import {isSubscribedReducer} from './subscription';

const rootReducer = combineReducers({
  getPrayer,
  getBookmark,
  checkBookmark,
  getSelectedBookmark,
  isSubscribedReducer,
});

export default rootReducer;
