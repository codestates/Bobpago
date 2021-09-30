import React from "react";
import { useState, useRef } from "react";
import { useHistory } from "react-router";
import {
  MatchCardBox,
  CardTitle,
  CardDifficulty,
  CardImageContainer,
  CardImage,
  SudoContainer,
  CardTimesLikesContainer,
  CardLikesContainer,
  CardLikesIcon,
  CardLikesText,
  CardTimesContainer,
  CardTimesIcon,
  CardTimesText,
  HiddenContainer,
  HiddenLeftContainer,
  HiddenLeftImage,
  HiddenRightContainer,
  HiddenTextContainer,
  HiddenTitle,
  HiddenMainIngredient,
  HiddenSubIngredient,
  HiddenCookingTime,
  HiddenDifficulty,
  MainIngredientContainer,
  MainIngredientText,
  MainIngredient,
  SubIngredientText,
  SubIngredientContainer,
  SubIngredient,
  HiddenCookingTimeContainer,
  HiddenCookingTimeText,
  HiddenDifficultyContainer,
  HiddenDifficultyText,
  HiddenPageMoveButton,
  HiddenBackButton,
  HiddenAmount,
  HiddenTopContainer,
} from "./styles";

interface DifficultyType {
  easy: string;
  normal: string;
  hard: string;
}

interface EachIngredient {
  id: number;
  name: string;
  type: string;
  basic: boolean;
  createdAt: string;
  updatedAt: string;
}

interface Ingredient {
  sub: EachIngredient[];
  main: EachIngredient[];
}

interface MatchCardProps {
  id: number;
  wind: number;
  time: number;
  title: string;
  level: number;
  views: number;
  amount: number;
  rotate: number;
  recipeId: number;
  thumbnail: string;
  ingredients: Ingredient;
  handleSwitch: VoidFunction;
  handleReturn: VoidFunction;
  handleOpacity: VoidFunction;
}

const difficulty: DifficultyType = {
  easy: "★",
  normal: "★★",
  hard: "★★★",
};

const MatchCard: React.FC<MatchCardProps> = ({
  id,
  wind,
  time,
  title,
  level,
  views,
  rotate,
  amount,
  recipeId,
  thumbnail,
  ingredients,
  handleSwitch,
  handleReturn,
  handleOpacity,
}) => {
  const [active, setActive] = useState(false);
  const activeCardRef = useRef<any>(null);
  const history = useHistory();
  const thumbnailSrc = process.env.REACT_APP_S3_IMG_URL;

  const handleLevel = (l: number) => {
    if (l === 1) {
      return difficulty.easy;
    } else if (l === 2) {
      return difficulty.normal;
    } else {
      return difficulty.hard;
    }
  };

  const handleActive = () => {
    if (!active) {
      setActive(true);
      const hiddenContainer = document.body.querySelector(
        `.a${String(id)}`
      ) as HTMLParagraphElement;

      hiddenContainer.classList.add("active");
    }
  };

  const handleInactive = () => {
    setActive(false);
    const hiddenContainer = document.body.querySelector(
      `.a${String(id)}`
    ) as HTMLParagraphElement;

    hiddenContainer.classList.remove("active");
  };

  const handlePageMove = () => {
    handleSwitch();
    setTimeout(() => {
      history.push({
        pathname: `/detailrecipe/:${recipeId}`,
        state: recipeId,
      });
    }, 2000);
  };

  return (
    <>
      <MatchCardBox
        rotate={rotate}
        wind={wind}
        ref={activeCardRef}
        className="cardBox"
        onClick={handleOpacity}
      >
        <CardTitle>{title}</CardTitle>
        <CardDifficulty>{handleLevel(level)}</CardDifficulty>
        <CardImageContainer>
          <CardImage src={thumbnailSrc + thumbnail} />
        </CardImageContainer>
        <SudoContainer
          onClick={(e) => {
            e.preventDefault();
            handleActive();
          }}
        ></SudoContainer>
        <CardTimesLikesContainer>
          <CardLikesContainer>
            <CardLikesIcon />
            <CardLikesText>{views}</CardLikesText>
          </CardLikesContainer>
          <CardTimesContainer>
            <CardTimesIcon />
            <CardTimesText>{`${time}:00`}</CardTimesText>
          </CardTimesContainer>
        </CardTimesLikesContainer>
      </MatchCardBox>
      <HiddenContainer className={"a" + String(id)}>
        <HiddenLeftContainer>
          <HiddenLeftImage src={thumbnailSrc + thumbnail} />
        </HiddenLeftContainer>
        <HiddenRightContainer>
          <HiddenTextContainer>
            <HiddenTopContainer>
              <HiddenTitle>{title}</HiddenTitle>
              <HiddenAmount>{`(${amount}인분)`}</HiddenAmount>
            </HiddenTopContainer>
            <HiddenMainIngredient>
              <MainIngredientText>필수 재료</MainIngredientText>
              <MainIngredientContainer>
                {ingredients.main.map((item) => {
                  return (
                    <MainIngredient key={item.id}>{item.name}</MainIngredient>
                  );
                })}
              </MainIngredientContainer>
            </HiddenMainIngredient>
            <HiddenSubIngredient>
              <SubIngredientText>부 재료</SubIngredientText>
              <SubIngredientContainer>
                {ingredients.sub.map((item) => {
                  return (
                    <MainIngredient key={item.id}>{item.name}</MainIngredient>
                  );
                })}
              </SubIngredientContainer>
            </HiddenSubIngredient>
            <HiddenCookingTimeContainer>
              <HiddenCookingTimeText>요리 시간 :</HiddenCookingTimeText>
              <HiddenCookingTime>{`${time}:00`}분</HiddenCookingTime>
            </HiddenCookingTimeContainer>
            <HiddenDifficultyContainer>
              <HiddenDifficultyText>요리 난이도 :</HiddenDifficultyText>
              <HiddenDifficulty>{handleLevel(level)}</HiddenDifficulty>
            </HiddenDifficultyContainer>
          </HiddenTextContainer>
        </HiddenRightContainer>
        <HiddenBackButton
          onClick={() => {
            handleInactive();
            handleReturn();
          }}
        />
        <HiddenPageMoveButton onClick={handlePageMove}>
          레시피 보러가기!
        </HiddenPageMoveButton>
      </HiddenContainer>
    </>
  );
};

export default MatchCard;
