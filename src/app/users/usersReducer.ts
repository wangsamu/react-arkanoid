import { USERS_ACTION_TYPES } from "./usersActionTypes";

const INITIAL_STATE = { currentUser: null };

const useresReducer = (state = INITIAL_STATE, action: any) => {
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

export default useresReducer;
