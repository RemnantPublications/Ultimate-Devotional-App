import {
  ADD_PRAYER,
  EDIT_PRAYER,
  ADD_BOOKMARK,
  TOGGLE_PRAYER,
  REMOVE_PRAYER,
  ACTIVE_COUPON,
  COUPON_EXPIRE,
  USER_SUBSCRIBED,
  REMOVE_BOOKMARK,
  SELECT_BOOKMARK,
  ALREADY_BOOKMARKED,
  REMOVE_ALL_BOOKMARK,
  ALREADY_BOOKMARKED_SUCCESS,
} from '../actions/actionTypes';

export const addItem = (title, description, date) => {
  return {
    type: ADD_PRAYER,
    title,
    description,
    date,
  };
};

export const toggleItem = index => {
  return {
    type: TOGGLE_PRAYER,
    index,
  };
};

export const editItem = (index, title, description, date) => {
  return {
    type: EDIT_PRAYER,
    index,
    title,
    description,
    date,
  };
};

export const removeItem = index => {
  return {
    type: REMOVE_PRAYER,
    index,
  };
};

export const addBookmark = (value, chapter, bookTitle, bookCover) => {
  return {
    type: ADD_BOOKMARK,
    value,
    chapter,
    bookTitle,
    bookCover,
  };
};

export const removeBookmark = index => {
  return {
    type: REMOVE_BOOKMARK,
    index,
  };
};

export const removeAllBookmark = index => {
  return {
    type: REMOVE_ALL_BOOKMARK,
    index,
  };
};

export const selectBookmark = (value, chapter, bookTitle, bookCover) => {
  return {
    type: SELECT_BOOKMARK,
    value,
    chapter,
    bookTitle,
    bookCover,
  };
};

export const checkBookmarked = value => {
  return {
    type: ALREADY_BOOKMARKED,
    value,
  };
};

export const checkBookmarkedSuccess = value => {
  return {
    type: ALREADY_BOOKMARKED_SUCCESS,
    value,
  };
};

export const isSubscribed = value => {
  return {
    type: USER_SUBSCRIBED,
    value,
  };
};

export const isCouponActive = value => {
  return {
    type: ACTIVE_COUPON,
    value,
  };
};

export const couponExpired = value => {
  return {
    type: COUPON_EXPIRE,
    value,
  };
};
