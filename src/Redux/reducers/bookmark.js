import {
  ALREADY_BOOKMARKED_SUCCESS,
  ALREADY_BOOKMARKED,
  UPDATE_BOOKMARK,
  UPDATE_SELECTED_BOOKMARK,
} from '../actions/actionTypes';

const initialState = {
  list: [],
};

const initialSelected = {
  text: '',
};

const initialcheckBookmark = {
  loading: false,
  check: false,
};

export const getBookmark = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_BOOKMARK:
      return {
        ...state,
        list: action.data,
      };
    default:
      return state;
  }
};

export const getSelectedBookmark = (state = initialSelected, action) => {
  switch (action.type) {
    case UPDATE_SELECTED_BOOKMARK:
      return {
        ...state,
        text: action.data,
      };
    default:
      return state;
  }
};

export const checkBookmark = (state = initialcheckBookmark, action) => {
  switch (action.type) {
    case ALREADY_BOOKMARKED:
      return {
        ...state,
        loading: true,
      };

    case ALREADY_BOOKMARKED_SUCCESS:
      return {
        ...state,
        loading: false,
        check: action.value,
      };

    default:
      return state;
  }
};
