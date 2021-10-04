import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Nav from "components/Nav/Nav";
import Title from "./TitleEdit";
import Time from "./TimeEdit";
import Ingredient from "./IngredientEdit";
import Description from "./DescriptionEdit";
import Loading from "components/Loading/Loading";
import Circle1 from "components/MovingCircle/WriteRecipe/WriteRecipeCircle1";
import Circle2 from "components/MovingCircle/WriteRecipe/WriteRecipeCircle2";
import { ContainerWrapper } from "./styles";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router";
import { RootState } from "reducers";
import {
  goToNextPageEdit,
  goToPrevPageEdit,
  resetEditPageEdit,
} from "actions/EditRecipePage";
import {
  editTitle,
  editTime,
  editDescription,
  editDifficulty,
  editIngredient,
  editServing,
  editImage,
} from "actions/EditRecipeContents";

const EditRecipe = () => {
  const [circle1IsHover, setCircle1IsHover] = useState<boolean>(false);
  const [circle2IsHover, setCircle2IsHover] = useState<boolean>(false);
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const locationProps = location.state;
  const serverUrl = process.env.REACT_APP_SERVER_URL;
  const page = useSelector(
    (state: RootState) => state.EditRecipePageReducer.currentPage
  );
  const { accessToken, userId } = useSelector(
    (state: RootState) => state.AccesstokenReducer
  );
  const [scale, setScale] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    page < 0 && dispatch(goToNextPageEdit());
    page > 3 && dispatch(goToPrevPageEdit());
    setTimeout(() => setScale(page), 700);
  }, [page]);

  async function getData() {
    const response = await axios.get(`${serverUrl}/recipe/${locationProps}`, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = response.data.data;
    if (userId !== data.user.id) {
      history.push("/");
      return;
    }
    const mainIngredients = data.ingredients.main.map((el: any) => el.id);
    const subIngredients = data.ingredients.sub.map((el: any) => el.id);
    const ingredients = [...mainIngredients, ...subIngredients];
    dispatch(editTitle(data.recipe.title));
    dispatch(editDifficulty(data.recipe.level));
    dispatch(editIngredient(ingredients));
    dispatch(editServing(data.recipe.amount));
    dispatch(editTime(data.recipe.estTime));
    dispatch(editDescription(data.recipe.descriptions));
    dispatch(editImage(data.recipe.imageUrls));
    setLoading(false);
  }
  useEffect(() => {
    getData();
    // dispatch(resetEditPageEdit());
  }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Nav opac={true} />
          <ContainerWrapper>
            <Title
              setCircle1IsHover={setCircle1IsHover}
              setCircle2IsHover={setCircle2IsHover}
              page={page}
              scale={scale}
            />
            <Time
              setCircle1IsHover={setCircle1IsHover}
              setCircle2IsHover={setCircle2IsHover}
              page={page - 1}
              scale={scale - 1}
            />
            <Ingredient
              setCircle1IsHover={setCircle1IsHover}
              setCircle2IsHover={setCircle2IsHover}
              page={page - 2}
              scale={scale - 2}
            />
            <Description
              setCircle1IsHover={setCircle1IsHover}
              setCircle2IsHover={setCircle2IsHover}
              page={page - 3}
              scale={scale - 3}
              locationProps={locationProps}
            />
            <Circle1 circle1IsHover={circle1IsHover} />
            <Circle2 circle2IsHover={circle2IsHover} />
          </ContainerWrapper>
        </>
      )}
    </>
  );
};

export default EditRecipe;
