import styled from "styled-components";

export const ContainerWrapper = styled.div<{ page: number }>`
  width: 100%;
  height: 100%;
  position: absolute;
  background-color: aliceblue;
  display: flex;
  flex-direction: row;
  box-sizing: border-box;
  left: ${(props) => -props.page * 100 + "%" || "0"};
  transition: all 0.3s;
  /* overflow: hidden;
  &:-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  } */
`;

export const TitleSlide = styled.div`
  position: absolute;
  left: 0%;
  width: 100%;
  background-color: aqua;
  height: 100%;
  transform: scale(0.95);
`;

export const RecipeTimeSlide = styled.div`
  position: absolute;
  width: 100%;
  background-color: beige;
  height: 100%;
  left: 100%;
  transform: scale(0.93);
`;

export const IngredientSlide = styled.div`
  position: absolute;
  width: 100%;
  background-color: aqua;
  height: 100%;
  left: 200%;
  transform: scale(0.93);
`;

export const DescriptionSlide = styled.div`
  position: absolute;
  width: 100%;
  background-color: aqua;
  height: 100%;
  left: 300%;
  transform: scale(0.93);
`;

export const NextButton = styled.button`
  /* width: 2em; */
  /* height: 2em; */
  position: fixed;
  right: 1em;
  bottom: 1em;
  z-index: 1;
`;

export const PrevButton = styled(NextButton)`
  position: fixed;
  left: 1em;
  bottom: 1em;
`;

export const CompleteButton = styled(NextButton)`
  position: fixed;
  z-index: 0;
`;
