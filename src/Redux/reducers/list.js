import {UPDATE_PRAYER} from '../actions/actionTypes';

const initialState = {
  list: [],
};

const getPrayer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_PRAYER:
      return {
        ...state,
        list: action.data,
      };
    default:
      return state;
  }
};

export default getPrayer;
