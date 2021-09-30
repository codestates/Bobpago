import styled, { keyframes } from "styled-components";
import { Time } from "@styled-icons/boxicons-regular/Time";
import { Like } from "@styled-icons/boxicons-regular/Like";
import { ArrowLeft } from "@styled-icons/bootstrap/ArrowLeft";
import { main } from "theme";

interface MatchCardProps {
  rotate: number;
  switch?: boolean;
  wind: number;
}

export const windLeft = (rotate: number, wind: number) => keyframes`
    
    0% {
        transform: ${`rotateZ(${rotate}deg)`};
        
    }

    50% {
        transform: ${`rotateZ(${rotate + wind}deg)`};
        
    }

    50% {
        transform: ${`rotateZ(${rotate + wind * 2}deg)`};
        
    }

    100% {
        transform: ${`rotateZ(${rotate}deg)`};
        
    }
`;

export const waitWind = keyframes`
    0% {
        transform: rotateZ(0deg);
    }

    100% {
        transform: rotateZ(0deg);
    }
`;

export const MatchCardBox = styled.div<MatchCardProps>`
  min-width: 15em;
  height: 18em;
  background-color: #000000;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  border-radius: 15px;
  transition: all 1s;
  transition-timing-function: cubic-bezier(0.075, 0.82, 0.165, 1);
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.3);
  animation: ${({ rotate, wind }) => windLeft(rotate, wind)} 4s ease infinite;
  margin-right: 4em;
  margin-left: 3em;
  z-index: 150;
  @media only screen and (max-width: 768px) {
    min-width: 12em;
    height: 14em;
    margin-right: 1em;
  }
  &:hover {
    animation: none;
    transform: rotateZ(0deg) scale(1.05);
  }
`;

export const CardTitle = styled.div`
  margin-top: 2em;
  flex: 5;
  font-size: 18px;
  z-index: 10;
  font-weight: 700;
  color: white;
  text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000,
    1px 1px 0 #000;

  @media only screen and (max-width: 768px) {
    font-size: ${main.mostSmallFont};
    margin-top: 1.5em;
  }
`;

export const CardDifficulty = styled.div`
  flex: 0.1;
  font-size: 24px;
  z-index: 10;
  color: #e0e035;
  text-shadow: 0 0 2px rgba(0, 0, 0, 1);
  @media only screen and (max-width: 768px) {
    font-size: 16px;
  }
`;

export const CardImageContainer = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  background-color: #ffffff;
  border-radius: 15px;
`;

export const CardImage = styled.img`
  width: 100%;
  height: 40%;
  border-radius: 15px;
  position: absolute;
  top: 30%;
  object-fit: cover;
`;

export const SudoContainer = styled.div`
  position: absolute;
  cursor: pointer;
  width: 100%;
  height: 100%;
  background: #0000006a;
  border-radius: 15px;
  transition: 0.5s;
  z-index: 80;
  &:hover {
    background: #eeeeee00;
  }
`;

export const CardTimesLikesContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex: 1;
  z-index: 10;
`;

export const CardLikesContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 0.5em;
`;

export const CardLikesIcon = styled(Like)`
  width: 20px;
  margin-right: 0.2em;
  @media only screen and (max-width: 768px) {
    width: 15px;
  }
`;

export const CardLikesText = styled.div`
  font-size: 15px;
  @media only screen and (max-width: 768px) {
    font-size: 14px;
  }
`;

export const CardTimesContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 0.5em;
`;

export const CardTimesIcon = styled(Time)`
  width: 20px;
  margin-right: 0.2em;
  @media only screen and (max-width: 768px) {
    width: 15px;
  }
`;

export const CardTimesText = styled.div`
  @media only screen and (max-width: 768px) {
    font-size: 14px;
  }
`;

export const HiddenContainer = styled.div`
  width: 80%;
  height: 0%;
  position: fixed;
  left: 10%;
  top: 50%;
  overflow: hidden;
  background-color: #ffffff;
`;

export const HiddenLeftContainer = styled.div`
  flex: 1;
  border-radius: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

export const HiddenLeftImage = styled.img`
  width: 60%;
  height: 60%;
  position: absolute;
  left: 25%;
  top: 15%;
  object-fit: cover;
  border-radius: 15px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.8);
`;

export const HiddenRightContainer = styled.div`
  flex: 1;
  background-color: #fefefe;
  border-radius: 15px;
  position: relative;
`;

export const HiddenTextContainer = styled.div`
  position: absolute;
  top: 10%;
`;

export const HiddenTopContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const HiddenTitle = styled.div`
  font-size: 42px;
  font-weight: 700;
  margin-right: 0.2em;
`;

export const HiddenAmount = styled.div`
  font-size: 24px;
`;

export const HiddenMainIngredient = styled.div`
  display: flex;
  margin-top: 2em;
`;

export const MainIngredientContainer = styled.ul`
  max-height: 7em;
  flex-wrap: wrap;
  display: flex;
  flex-direction: column;
`;

export const MainIngredientText = styled.div`
  font-size: 24px;
`;

export const MainIngredient = styled.li`
  font-size: 18px;
  margin-left: 2em;
`;

export const HiddenSubIngredient = styled.div`
  display: flex;
  margin-top: 2em;
`;

export const SubIngredientContainer = styled.ul`
  max-height: 7em;
  flex-wrap: wrap;
  display: flex;
  flex-direction: column;
`;

export const SubIngredientText = styled.div`
  font-size: 24px;
`;

export const SubIngredient = styled.li`
  font-size: 18px;
  margin-left: 2em;
`;

export const HiddenCookingTimeContainer = styled.div`
  display: flex;
  margin-top: 2em;
  align-items: center;
`;

export const HiddenCookingTimeText = styled.div`
  font-size: 24px;
  margin-right: 0.3em;
`;

export const HiddenCookingTime = styled.div`
  font-size: 24px;
`;

export const HiddenDifficultyContainer = styled.div`
  display: flex;
  margin-top: 2em;
  align-items: center;
`;

export const HiddenDifficultyText = styled.div`
  font-size: 24px;
  margin-right: 0.3em;
`;

export const HiddenDifficulty = styled.div`
  font-size: 24px;
  color: orange;
`;

export const HiddenBackButton = styled(ArrowLeft)`
  width: 40px;
  position: absolute;
  top: 3%;
  left: 2%;
  cursor: pointer;
  transition: 0.5s;
  &:hover {
    transform: scale(1.2);
  }
`;

export const HiddenPageMoveButton = styled.button`
  position: absolute;
  right: 5%;
  bottom: 5%;
  width: 10em;
  height: 2.5em;
  background-color: #d43838;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
  transition: 0.5s;
  color: #ffffff;
  outline: none;
  border: none;
  cursor: pointer;
  border-radius: 5px;

  &:hover {
    background-color: red;
    transform: scale(1.1);
  }
`;
