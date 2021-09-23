import styled, { keyframes } from "styled-components";
import { QuestionMarkCircle } from "@styled-icons/evaicons-solid/QuestionMarkCircle/QuestionMarkCircle";

interface SlideProps {
  page: number;
  scale: number;
}

export const ContainerWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  background-color: #ececec;
  display: flex;
  flex-direction: row;
  box-sizing: border-box;
  transition: all 0.3s ease;
  overflow: hidden;
`;

export const TitleSlide = styled.div<SlideProps>`
  position: absolute;
  left: ${(props) => -props.page * 100 + "%" || "0"};
  width: 100%;
  background-color: #ececec;
  height: 100%;
  transform: ${(props) => (props.scale === 0 ? "scale(1)" : "scale(0.93)")};
  transition: all 0.7s ease;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

export const RecipeTimeSlide = styled(TitleSlide)<SlideProps>``;

export const IngredientSlide = styled(TitleSlide)<SlideProps>``;

export const DescriptionSlide = styled(TitleSlide)<SlideProps>`
  background: transparent;
  display: flex;
  flex-direction: column;
`;

export const RecipeTitle = styled.div`
  margin-bottom: 1em;
  display: block;
  margin: 4em auto;
  margin-bottom: 0.5em;
  font-size: 40px;
  font-weight: 500;
`;

export const TitleInput = styled.input`
  margin-top: 0.5em;
  width: 16em;
  font-size: 30px;
  border: none;
  border-bottom: 2px solid #adadad;
  padding-bottom: 0.3em;
  padding-left: 0.3em;
  transform: translateX(0.8em);
  color: #7a7a7a;
  background: transparent;
  &:focus {
    outline: none;
  }
`;

export const ExpectedTime = styled(RecipeTitle)`
  display: inline;
`;

const animShadow = keyframes`
  100% {
    box-shadow: 0px 0px 10px 10px rgba(78, 171, 217, 0);
  }
`;
export const RadioContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  text-align: center;
  #other {
    transform: translate(-3.9em, 1.3em);
    &:hover {
      transform: translate(-3.9em, 1.3em) scale(1.1);
    }
  }
`;
export const TimeRadioButton = styled.input.attrs({
  type: "radio",
})`
  -webkit-appearance: none;
  -moz-appearance: none;
  margin: 0.3em;
  width: 5em;
  height: 3em;
  font-size: 17px;
  color: #858585;
  background-color: #e0e0e0;
  border: 0px solid rgba(32, 72, 250, 0);
  border-radius: 30px;
  outline: none;
  cursor: pointer;
  transition: 0.3s;
  &:focus {
    color: #fff;
    border: 2px solid rgba(78, 171, 217, 1);
    box-shadow: 0px 0px 0px 1px rgba(78, 171, 217, 1);
    background-color: #4eabd9;
    animation: ${animShadow} 0.6s forwards;
  }
  & + span {
    transition: 0.3s;
    cursor: pointer;
    color: #858585;
    position: absolute;
    transform: translate(-5em, 1.3em);
  }
  &:focus + span {
    color: #fff;
  }
  &:hover + span {
    transform: translate(-5em, 1.3em) scale(1.1);
  }
  &:checked {
    color: #fff;
    border: 2px solid rgba(78, 171, 217, 1);
    box-shadow: 0px 0px 0px 1px rgba(78, 171, 217, 1);
    background-color: #4eabd9;
    animation: ${animShadow} 0.6s forwards;
    & + span {
      color: #fff;
    }
  }
`;
export const LabelText = styled.span`
  &:hover {
    transform: translate(-5em, 1.3em) scale(1.1);
  }
`;

export const TheOtherTimeInput = styled(TitleInput)`
  margin-top: 1em;
  width: 12em;
  font-size: 17px;
`;

export const TheOtherTimeContainer = styled(RadioContainer)``;

export const TheOtherTimeTooltip = styled(QuestionMarkCircle)`
  position: relative;
  top: 0.3em;
  left: 1.3em;
  width: 2em;
  &:hover {
    & + span {
      visibility: visible;
      opacity: 0.8;
    }
  }
`;

export const TheOtherTimeTooltipText = styled.span`
  position: absolute;
  width: 17em;
  height: 2.5em;
  visibility: hidden;
  background-color: #2e424d;
  padding: 1.2em 0;
  margin: 0;
  opacity: 0;
  line-height: 0.4em;
  transition: all 0.3s;
  z-index: 2;
  font-size: 13px;
  color: #fff;
  justify-content: center;
  text-align: center;
  border-radius: 5px;
  transform: translate(15em, 3.5em);
  &:after {
    transform: translate(-14.2em, -2.5em);
    content: " ";
    position: absolute;
    border-style: solid;
    border-width: 10px;
    height: 2px;
    border-color: transparent transparent #2e424d transparent;
  }
`;
export const ExpectedTimeContainer = styled.div`
  margin-bottom: 1em;
  margin-top: 10em;
`;

export const ExpectedTimeTooltip = styled(QuestionMarkCircle)`
  display: inline;
  width: 2em;
  position: relative;
  transform: translate(1em, -0.8em);
  &:hover {
    & + span {
      visibility: visible;
      opacity: 0.8;
    }
  }
`;

export const ExpectedTimeTooltipText = styled(TheOtherTimeTooltipText)`
  transform: translate(-2.9em, 3.5em);
  &:after {
    transform: translate(-14.2em, -2.5em);
  }
`;

export const IngredientTitle = styled(RecipeTitle)``;

export const SearchBarTooltip = styled(ExpectedTimeTooltip)``;

interface PageProps {
  page?: number;
}

export const NextButton = styled.button<PageProps>`
  position: fixed;
  bottom: 2em;
  z-index: 1;
  position: absolute;
  right: 2%;
  width: 8em;
  height: 2.5em;
  background-color: #167ece;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
  transition: 0.5s;
  color: #ffffff;
  outline: none;
  border: none;
  cursor: pointer;
  border-radius: 20px;
  display: ${(props) => (props.page === 3 ? "none" : "block")};
  &:hover {
    background-color: #1638ce;
    transform: scale(1.1);
  }
`;

export const PrevButton = styled(NextButton)<PageProps>`
  position: fixed;
  left: 2%;
  bottom: 2em;
  display: ${(props) => (props.page === 0 ? "none" : "block")};
`;

export const CompleteButton = styled(NextButton)<PageProps>`
  position: fixed;
  z-index: 0;
`;
export const Container = styled.div`
  display: flex;
  flex-flow: row wrap;
  align-items: flex-start;
  z-index: 1;
`;

export const SearchBarWrapper = styled.input`
  padding: 0.1em;
  height: 1.3em;
  border: none;
  margin: 0.3em;
  font-size: 18px;
  outline: none;
  width: 5.5em;
  text-transform: capitalize;
  display: inline;
  position: relative;
  z-index: 1;
  background: transparent;
`;

export const AutoContainer = styled.div`
  transform: translateY(0.3em);
  position: absolute;
  background-color: #fff;
  width: 100%;
  max-height: 10em;
  overflow-y: auto;
  border: 0.5px solid #c9c9c9;
  border-radius: 15px;
  z-index: 99;
  .option {
    z-index: 99;
  }
  .option,
  span {
    text-align: left;
    padding-left: 0.5em;
    padding-top: 0.2em;
    font-size: 16px;
    z-index: 99;
  }
  .option:hover {
    background-color: #1b85cc;
    color: #fff;
    z-index: 99;
  }
  .selected {
    background-color: #1b85cc;
    color: #fff;
    z-index: 99;
  }
`;

export const TagContainer = styled.div`
  z-index: 3;
  position: relative;
  margin: 0 auto;
  width: 25em;
  border: 1px solid #c9c9c9;
  border-radius: 15px;
  &:focus {
    box-shadow: 0px 0px 0px 1px rgba(78, 171, 217, 1);
  }
`;

export const DescriptionTitle = styled(IngredientTitle)`
  position: absolute;
  top: 0.5em;
  margin-top: 0;
  font-size: 25px;
`;
