import { useEffect } from "react";
import { useAppDispatch } from "../../app/hooks";
import { setCurrentUser } from "../../app/users/usersActions";
import { createUserDocumentFromAuth, onAuthStateChangedListener } from "../../utils/firebase/firebaseUtils";
import Game from "../Game/Game";
import SignIn from "../SignIn/SignIn";
import AppStyled from "./AppStyled";

function App() {
  const dispatch = useAppDispatch();


  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user:object) => {
      if (user) {
        createUserDocumentFromAuth(user);
      }
      dispatch(setCurrentUser(user));
    });
    return unsubscribe;
  }, [dispatch]);

  return (
    <AppStyled className="wrap-container">
      <Game />
      <SignIn />
    </AppStyled>
  );
}

export default App;
