import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import usersReducer from "./slices/usersSlice";

const reducer = {
  users: usersReducer,
};
export const store = configureStore({
  reducer: reducer,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
