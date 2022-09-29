import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import useresReducer from "./users/usersReducer";

export const store = configureStore({
  reducer: {
    users: useresReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
