import React from "react";
import { useState, useRef } from "react";
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
  veryeasy: string;
  easy: string;
  soso: string;
  hard: string;
  veryhard: string;
}

interface MatchCardProps {
  rotate: number;
  handleSwitch: VoidFunction;
  wind: number;
  id: number;
}

const difficulty: DifficultyType = {
  veryeasy: "★",
  easy: "★★",
  soso: "★★★",
  hard: "★★★★",
  veryhard: "★★★★★",
};

const MatchCard: React.FC<MatchCardProps> = ({
  rotate,
  handleSwitch,
  wind,
  id,
}) => {
  const [active, setActive] = useState(false);
  const activeCardRef = useRef<any>(null);

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
  };

  return (
    <>
      <MatchCardBox
        rotate={rotate}
        wind={wind}
        ref={activeCardRef}
        className="cardBox"
      >
        <CardTitle>달걀 볶음밥</CardTitle>
        <CardDifficulty>{difficulty.soso}</CardDifficulty>
        <CardImageContainer>
          <CardImage src="https://en.pimg.jp/034/556/734/1/34556734.jpg" />
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
            <CardLikesText>1,203</CardLikesText>
          </CardLikesContainer>
          <CardTimesContainer>
            <CardTimesIcon />
            <CardTimesText>10:00</CardTimesText>
          </CardTimesContainer>
        </CardTimesLikesContainer>
      </MatchCardBox>
      <HiddenContainer className={"a" + String(id)}>
        <HiddenLeftContainer>
          <HiddenLeftImage src="https://en.pimg.jp/034/556/734/1/34556734.jpg" />
        </HiddenLeftContainer>
        <HiddenRightContainer>
          <HiddenTextContainer>
            <HiddenTopContainer>
              <HiddenTitle>달걀 볶음밥</HiddenTitle>
              <HiddenAmount>{`(${`2인분`})`}</HiddenAmount>
            </HiddenTopContainer>
            <HiddenMainIngredient>
              <MainIngredientText>필수 재료</MainIngredientText>
              <MainIngredientContainer>
                <MainIngredient>양파</MainIngredient>
                <MainIngredient>계란</MainIngredient>
                <MainIngredient>파</MainIngredient>
                <MainIngredient>밥</MainIngredient>
              </MainIngredientContainer>
            </HiddenMainIngredient>
            <HiddenSubIngredient>
              <SubIngredientText>부 재료</SubIngredientText>
              <SubIngredientContainer>
                <SubIngredient>간장</SubIngredient>
                <SubIngredient>식용유</SubIngredient>
                <SubIngredient>참기름</SubIngredient>
                <SubIngredient>참깨</SubIngredient>
              </SubIngredientContainer>
            </HiddenSubIngredient>
            <HiddenCookingTimeContainer>
              <HiddenCookingTimeText>요리 시간 :</HiddenCookingTimeText>
              <HiddenCookingTime>10:00</HiddenCookingTime>
            </HiddenCookingTimeContainer>
            <HiddenDifficultyContainer>
              <HiddenDifficultyText>요리 난이도 :</HiddenDifficultyText>
              <HiddenDifficulty>{difficulty.soso}</HiddenDifficulty>
            </HiddenDifficultyContainer>
          </HiddenTextContainer>
        </HiddenRightContainer>
        <HiddenBackButton onClick={handleInactive} />
        <HiddenPageMoveButton onClick={handlePageMove}>
          레시피 보러가기!
        </HiddenPageMoveButton>
      </HiddenContainer>
    </>
  );
};

export default MatchCard;
