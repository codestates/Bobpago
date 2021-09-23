import Nav from "components/Nav/Nav";
import Survay from "pages/Survay/Survay";
import Box from "pages/box/box";
import React, { useState } from "react";
import "./App.css";
import SignIn from "pages/SignUpAndSignIn/SignIn";
import SignUp from "pages/SignUpAndSignIn/SignUp";
import WriteRecipe from "pages/WriteRecipe/WriteRecipe";
import { useDispatch } from "react-redux";
import { showSignIn } from "actions/SignUpAndSignIn";
import DetailRecipe from "pages/DetailRecipe/DetailRecipe";

function App() {
  const dispatch = useDispatch();
  return (
    <div className="app">
      {/* <Survay /> */}
      <DetailRecipe />
      {/* <Box /> */}
      {/* <button className="test" onClick={() => dispatch(showSignIn())}>
        click
      </button>
      <SignIn />
      <SignUp /> */}
      {/* <WriteRecipe /> */}
    </div>
  );
}

export default App;
