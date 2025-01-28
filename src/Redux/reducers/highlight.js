// eslint-disable-next-line prettier/prettier
import {
  UPDATE_HIGHLIGHT,
  SET_HIGHLIGHT,
} from '../actions/actionTypes';

const initialState = {
  list: [],
};

export const getHighlight = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_HIGHLIGHT:
      return {
        ...state,
        list: action.data,
      };
    case SET_HIGHLIGHT:
      return {
        ...state,
        list: action.data, // Replace all highlights with the fetched list
      };
    default:
      return state;
  }
};

//export default getHighlight;
