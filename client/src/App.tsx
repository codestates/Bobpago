import Survay from "pages/Survay/Survay";
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
import { Route, Switch, useHistory, withRouter } from "react-router-dom";
import LandingPage from "pages/LandingPage/LandingPage";
import { useEffect } from "react";
import axios from "axios";

function App() {
  const dispatch = useDispatch();

  const AllIngredient = async () => {
    const data = await axios.get("http://localhost:3000/ingredient", {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(data);
  };

  useEffect(() => {
    AllIngredient();
  }, []);

  return (
    <Switch>
      {/* <Route exact path="/">
        <LandingPage />
        <button className="test" onClick={() => dispatch(showSignIn())}>
          click
        </button>
        <SignIn />
        <SignUp />
      </Route> */}
      <Route exact path="/">
        <Survay />
      </Route>
      <Route path="/matching">
        <MatchingRecipe />
      </Route>
      <Route path="/detailrecipe">
        <DetailRecipe />
      </Route>
      <Route path="/writerecipe">
        <WriteRecipe />
        <NofiticationCenter />
      </Route>
      <Route path="/editrecipe">
        <EditRecipe />
        <NofiticationCenter />
      </Route>
      <Route path="/mypage">
        <MyPage />
      </Route>
      <Route path="/userpage">
        <UserPage />
      </Route>
      <Route></Route>
      {/* <FollowModal /> */}
    </Switch>
  );
}

export default App;
