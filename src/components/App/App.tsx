import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { setCurrentUser } from "../../app/slices/usersSlice";
import { RootState } from "../../app/store";
import {
  createUserDocumentFromAuth,
  onAuthStateChangedListener,
  signOutUser,
} from "../../utils/firebase/firebaseUtils";
import Game from "../Game/Game";
import SignIn from "../SignIn/SignIn";
import SignOut from "../SignOut/SignOut";
import SignUp from "../SignUp/SignUp";
import SignUpForm from "../SignUp/SignUp";
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
      {currentUser ? <Game /> : <SignUp />}
      {currentUser && <SignOut signOutUser={signOutUser} />}
      {/* <Game /> */}
    </AppStyled>
  );
}

export default App;
