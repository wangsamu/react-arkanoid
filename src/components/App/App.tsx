import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { setCurrentUser } from "../../app/slices/usersSlice";
import { RootState } from "../../app/store";
import {
  createUserDocumentFromAuth,
  onAuthStateChangedListener,
} from "../../utils/firebase/firebaseUtils";
import Game from "../Game/Game";
import SignIn from "../SignIn/SignIn";
import AppStyled from "./AppStyled";

function App() {
  const currentUser = useAppSelector(
    (state: RootState) => state.users.currentUser
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user: object) => {
      if (user) {
        createUserDocumentFromAuth(user);
      }
      dispatch(setCurrentUser(user));
    });
    return unsubscribe;
  }, [dispatch]);

  console.log(currentUser);
  return (
    <AppStyled className="wrap-container">
      {currentUser ? <button>Sign out</button> : <SignIn />}
      <Game />
    </AppStyled>
  );
}

export default App;
