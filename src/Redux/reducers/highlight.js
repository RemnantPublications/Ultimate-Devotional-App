// eslint-disable-next-line prettier/prettier
import {
  UPDATE_HIGHLIGHT,
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
    default:
      return state;
  }
};

//export default getHighlight;
