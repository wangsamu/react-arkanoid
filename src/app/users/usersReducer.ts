import { AnyAction } from "@reduxjs/toolkit";
import { USERS_ACTION_TYPES } from "./usersTypes";

const INITIAL_STATE = { currentUser: null };

const usersReducer = (state = INITIAL_STATE, action: AnyAction) => {
  const { type, payload } = action;

  switch (type) {
    case USERS_ACTION_TYPES.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: payload,
      };
    default:
      return state;
  }
};

export default usersReducer;
