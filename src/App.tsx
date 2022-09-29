import React from "react";

import "./App.css";
import { signInWithGoogle } from "./utils/firebase/firebase.utils";

function App() {
  return <div className="App">
    {/* testing if then sign in with Google funciton works */}
    <button onClick={signInWithGoogle}>Sign in with Google</button>
  </div>;
}

export default App;
