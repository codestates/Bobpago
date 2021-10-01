import React, { useEffect, useState } from "react";
import {
  RightContent,
  RightContentBasic,
  RightContentWriter,
  RightContentTitle,
  RightContentTime,
  RightContentDifficulty,
  RightMainContent,
  RightMainFooter,
  TimeIcon,
} from "./styles";
import { useHistory } from "react-router";
import { RootState } from "reducers";
import { useSelector } from "react-redux";

interface DRContentProps {}

interface DifficultyType {
  easy: string;
  normal: string;
  hard: string;
}

const DRContent: React.FC<DRContentProps> = () => {
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const { userId: myId } = useSelector(
    (state: RootState) => state.AccesstokenReducer
  );
  const recipeState = useSelector(
    (state: RootState) => state.DetailRecipeReducer
  );
  const difficulty: DifficultyType = {
    easy: "★",
    normal: "★★",
    hard: "★★★",
  };

  const handleLevel = (l: number) => {
    if (l === 1) {
      return difficulty.easy;
    } else if (l === 2) {
      return difficulty.normal;
    } else {
      return difficulty.hard;
    }
  };

  useEffect(() => {
    if (Array.isArray(recipeState.recipe)) {
      return;
    } else {
      setLoading(false);
    }
  }, [recipeState]);

  const handleMoveToUserPage = () => {
    console.log(recipeState.user);
    const userId = recipeState.user.id;
    if (userId === myId) {
      history.push({
        pathname: `/mypage`,
      });
    } else {
      history.push({
        pathname: `/userpage/${userId}`,
        state: userId,
      });
    }
  };

  return (
    <RightContent>
      <RightContentWriter onClick={() => handleMoveToUserPage()}>
        {loading ? "LOADING" : recipeState.user.nickname}
      </RightContentWriter>
      <RightContentTitle>
        {loading ? "LOADING" : recipeState.recipe.title}
      </RightContentTitle>
      <RightContentBasic>
        <RightContentTime>
          <TimeIcon />
          {loading ? "LOADING" : recipeState.recipe.estTime + ":00"}
        </RightContentTime>
        <RightContentDifficulty>
          난이도: {loading ? "LOADING" : handleLevel(recipeState.recipe.level)}
        </RightContentDifficulty>
      </RightContentBasic>
      <RightMainContent>
        <RightMainFooter></RightMainFooter>
      </RightMainContent>
    </RightContent>
  );
};

export default DRContent;
