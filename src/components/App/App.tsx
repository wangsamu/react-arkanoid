import Game from "../Game/Game";
import SignIn from "../SignIn/SignIn";
import AppStyled from "./AppStyled";

function App() {

  return (
    <AppStyled className="wrap-container">
      <Game />
      <SignIn />
    </AppStyled>
  );
}

export default App;
