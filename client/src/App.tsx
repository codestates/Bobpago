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
<<<<<<< HEAD
// import { LogoRow } from "components/SignUpAndSignIn/LogoRow";
  
=======
import DetailRecipe from "pages/DetailRecipe/DetailRecipe";

>>>>>>> f34fd49b475bb1ecbd478603c5a3f1104dc6a1f2
function App() {
  const dispatch = useDispatch();
  return (
    <div>
      {/* <Survay /> */}
      {/* <Survay /> */}
      <DetailRecipe />
      {/* <Box /> */}
      {/* <button className="test" onClick={() => dispatch(showSignIn())}>
        click
      </button>
      <SignIn />
      <SignUp /> */}
      <WriteRecipe />
      {/* <WriteRecipe /> */}
    </div>
  );
}

export default App;
