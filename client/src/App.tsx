import Survay from "pages/Survay/Survay";
import React from "react";
import "./App.css";
import WriteRecipe from "pages/WriteRecipe/WriteRecipe";
import { useDispatch } from "react-redux";
import DetailRecipe from "pages/DetailRecipe/DetailRecipe";
import NofiticationCenter from "components/Notification/NotificationCenter";
import MyPage from "pages/MyOrUserPage/MyPage";
import UserPage from "pages/MyOrUserPage/UserPage";
import EditRecipe from "pages/EditRecipe/EditRecipe";
import MatchingRecipe from "pages/MatchingRecipe/MatchingRecipe";
import { Route, Switch } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import AuthLoading from "pages/AuthLoading/AuthLoading";
import NaverLoading from "pages/AuthLoading/NaverLoading";
import GoogleLoading from "pages/AuthLoading/GoogleLoading";
import LandingPage from "pages/LandingPage/LandingPage";
import { GET_ALL_DATA, GET_SMALL_DATA } from "actions/IngredientAction";

function App() {
  const dispatch = useDispatch();

  const AllIngredient = async () => {
    const data = await axios.get(
      `${process.env.REACT_APP_SERVER_URL}/ingredient/main`,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    dispatch({ type: GET_ALL_DATA, payload: data.data.data });
  };

  const SmallIngredient = async () => {
    const data = await axios.get(
      `${process.env.REACT_APP_SERVER_URL}/ingredient/basic`,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    dispatch({ type: GET_SMALL_DATA, payload: data.data.data });
  };

  useEffect(() => {
    AllIngredient();
    SmallIngredient();
  }, []);

  return (
    <Switch>
      <Route exact path="/">
        <LandingPage />
      </Route>
      <Route path="/survey">
        <Survay />
        <NofiticationCenter />
      </Route>
      <Route path="/matching">
        <MatchingRecipe />
      </Route>
      <Route path="/detailrecipe/:recipeId">
        <DetailRecipe />
        <NofiticationCenter />
      </Route>
      <Route path="/writerecipe">
        <WriteRecipe />
        <NofiticationCenter />
      </Route>
      <Route path="/editrecipe/:recipeId">
        <EditRecipe />
        <NofiticationCenter />
      </Route>
      <Route path="/mypage">
        <MyPage />
      </Route>
      <Route path="/userpage/:userId">
        <UserPage />
      </Route>
      <Route path="/auth/kakao">
        <AuthLoading />
      </Route>
      <Route path="/auth/naver">
        <NaverLoading />
      </Route>
      <Route path="/auth/google">
        <GoogleLoading />
      </Route>
      {/* <FollowModal /> */}
    </Switch>
  );
}

export default App;
