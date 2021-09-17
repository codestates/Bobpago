import Box from "pages/box/box";
import React, { useState } from "react";
import "./App.css";
import SignIn from "pages/SignUpAndSignIn/SignIn";
import SignUp from "pages/SignUpAndSignIn/SignUp";
import WriteRecipe from "pages/WriteRecipe/WriteRecipe";
import { useDispatch } from "react-redux";
import { showSignIn } from "actions/SignUpAndSignIn";
import { LogoRow } from "components/SignUpAndSignIn/LogoRow";
function App() {
  const dispatch = useDispatch();
  return (
    <div className="App">
      {/* <header className="App-header"> */}
      {/* <Box /> */}
      {/* <button className="test" onClick={() => dispatch(showSignIn())}>
          click
        </button> */}
      <SignIn />
      <SignUp />
      <WriteRecipe />
      {/* </header> */}
      {/* <header className="App-header" /> */}
    </div>
  );
}

export default App;
