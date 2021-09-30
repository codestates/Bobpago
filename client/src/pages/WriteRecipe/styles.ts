import styled, { keyframes } from "styled-components";
import { QuestionMarkCircle } from "@styled-icons/evaicons-solid/QuestionMarkCircle/QuestionMarkCircle";
import { main } from "theme";

interface SlideProps {
  page: number;
  scale: number;
}

export const ContainerWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  background-color: ${main.bg};
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
  background-color: ${main.bg};
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
  display: block;
  margin: 20% auto;
  margin-bottom: 0.5em;
  font-size: 60px;
  font-weight: 500;
`;
export const StarContainer = styled.div`
  position: relative;
  justify-content: center;
  align-item: center;
  padding: 1em auto;
  display: table;
  margin-left: auto;
  margin-right: auto;
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
  font-size: 40px;
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
    transform: translate(-4.1em, 1.4em);
    &:hover {
      transform: translate(-4.1em, 1.4em) scale(1.1);
    }
  }
`;
export const TimeRadioButton = styled.input.attrs({
  type: "radio",
})`
  -webkit-appearance: none;
  -moz-appearance: none;
  margin: 0.3em;
  width: 7em;
  height: 4em;
  font-size: 17px;
  color: #858585;
  background-color: #e0e0e0;
  border: 0px solid rgba(32, 72, 250, 0);
  border-radius: 35px;
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
    font-size: 20px;
    transition: 0.3s;
    cursor: pointer;
    color: #858585;
    position: absolute;
    transform: translate(-5.19em, 1.4em);
  }
  &:focus + span {
    color: #fff;
  }
  &:hover + span {
    transform: translate(-5.19em, 1.4em) scale(1.1);
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
    transform: translate(-5.19em, 1.4em) scale(1.1);
  }
`;

export const TheOtherTimeInput = styled(TitleInput)`
  margin-top: 1em;
  width: 12em;
  font-size: 24px;
`;

export const PeopleNumInput = styled(TheOtherTimeInput)`
  width: 16em;
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
  font-size: 15px;
  color: #fff;
  justify-content: center;
  text-align: center;
  border-radius: 5px;
  transform: translate(16em, 3.5em);
  &:after {
    transform: translate(-13.5em, -2.5em);
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
  margin-top: 11%;
`;

export const ExpectedPeopleContainer = styled(ExpectedTimeContainer)`
  margin-top: 5em;
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

export const IngredientTitle = styled(RecipeTitle)`
  margin-top: 1.5em;

  font-size: 40px;
`;

export const DifficultyTitle = styled(IngredientTitle)`
  margin-top: 13%;
`;

export const SearchBarTooltip = styled(ExpectedTimeTooltip)``;

interface PageProps {
  page?: number;
  self?: number;
}

export const NextButton = styled.button<PageProps>`
  font-size: 20px;
  position: fixed;
  bottom: 4%;
  z-index: 1;
  position: absolute;
  right: 3%;
  width: 8em;
  height: 2.5em;
  background-color: #167ece;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
  transition: 0.5s;
  color: #ffffff;
  outline: none;
  border: none;
  cursor: pointer;
  border-radius: 26px;
  display: ${(props) => (props.page === 0 ? "block" : "none")};
  z-index: ${(props) => (props.page === props.self ? "99" : "1")};
  &:hover {
    background-color: #1638ce;
    transform: scale(1.1);
  }
`;

export const PrevButton = styled(NextButton)<PageProps>`
  position: fixed;
  left: 3%;
  display: ${(props) => (props.page === 0 ? "block" : "none")};
  z-index: ${(props) => (props.page === props.self ? "99" : "1")};
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
  height: 1.8em;
  border: none;
  margin: 0.3em;
  font-size: 23px;
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
  background-color: transparent;
  width: 100%;
  max-height: 13em;
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
    font-size: 20px;
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
  width: 30em;
  border: 1px solid #c9c9c9;
  border-radius: 24px;
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

const showModal = keyframes`
  from {
    top: 85%;
    right: -90%;
    transform: scale(0) ;
  }
  to {
    top: 35%
    transform: scale(1);
  }
`;

export const ModalContainer = styled.div`
  position: fixed;
  top: 35%;
  margin: 0 auto;
  left: 0;
  right: 0;
  float: center;
  width: 25em;
  height: 13em;
  animation: ${showModal} 0.5s;
  z-index: 10000;
  background: #f5f5f5;
  border-radius: 15px;
  text-align: center;
`;

export const ModalBackground = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  background: grey;
  opacity: 0.5;
  z-index: 9999;
`;

export const ModalTitle = styled.p`
  font-size: 22px;
  margin: 3em auto;
  margin-bottom: 2em;
`;

export const ModalBtn = styled.button`
  outline: none;
  border-radius: 10px;
  border: none;
  height: 1.5em;
  font-size: 18px;
  min-width: 3em;
  background: #42a5c9;
  color: #fff;
  cursor: pointer;
`;

export const ModalBtnNo = styled(ModalBtn)`
  background: #42a5c9;
`;

// export const name = styled.div``;
