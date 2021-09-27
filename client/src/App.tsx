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
import NofiticationCenter from "components/Notification/NotificationCenter";
import MyPage from "pages/MyOrUserPage/MyPage";
import UserPage from "pages/MyOrUserPage/UserPage";
import EditRecipe from "pages/EditRecipe/EditRecipe";
import FollowModal from "components/FollowModal/FollowModal";
import MatchingRecipe from "pages/MatchingRecipe/MatchingRecipe";

function App() {
  const dispatch = useDispatch();
  return (
    <div>
      {/* <Survay /> */}
      {/* <Survay /> */}
      {/* <DetailRecipe /> */}
      {/* <Box /> */}
      {/* <button className="test" onClick={() => dispatch(showSignIn())}>
        click
      </button>
      <SignIn />
      <SignUp /> */}
      {/* <WriteRecipe /> */}
      {/* <EditRecipe /> */}
      {/* <MyPage /> */}
      {/* <UserPage /> */}
      {/* <FollowModal /> */}
      <NofiticationCenter />
      {/* <DetailRecipe /> */}
      {/* <MatchingRecipe /> */}
    </div>
  );
}

export default App;
