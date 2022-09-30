import { createAction } from "../../utils/reducerUtils";
import { USERS_ACTION_TYPES } from "./usersTypes";

export const setCurrentUser = (user: object) => {
  createAction(USERS_ACTION_TYPES.SET_CURRENT_USER, user);
};
