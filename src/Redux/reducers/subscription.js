import {
  ACTIVE_COUPON,
  USER_SUBSCRIBED,
  COUPON_EXPIRE,
} from '../actions/actionTypes';

const initialState = {
  subscribed: false,
  couponActive: false,
  couponExpired: false,
};

export const isSubscribedReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_SUBSCRIBED:
      return {
        ...state,
        subscribed: action.value,
      };

    case ACTIVE_COUPON:
      return {
        ...state,
        couponActive: action.value,
      };

    case COUPON_EXPIRE:
      return {
        ...state,
        couponExpired: action.value,
      };

    default:
      return state;
  }
};
