import styled from "styled-components";
import { main } from "theme";

interface IngredientProps {
  light: boolean;
}

export const BadCookerRecipe = styled.div<IngredientProps>`
  width: 95%;
  height: 14vh;
  z-index: 100;
  background-color: #382f22;
  margin: 0.3em auto;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 5px 5px rgba(0, 0, 0, 0.4);
  text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000,
    1px 1px 0 #000;
  cursor: pointer;
  &:hover {
    img {
      transition: 0.5s;
      transform: scale(1.2);
    }
  }

  h1 {
    z-index: 10;
    background: ${({ light }): any => {
      return light ? "#00000000" : "#000000a6";
    }};
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #ffffff;
    border-radius: 10px;
    font-size: 32px;
    transition: 0.5s;
    //#000000a6
    &:hover {
      transition: 0.5s;
      color: #ffffff;
      text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000,
        1px 1px 0 #000;
      background: #00000020;
      font-size: 48px;
      text-decoration: whitesmoke;
    }
  }

  img {
    width: 100%;
    height: 100%;
    transition: 0.5s;
    object-position: center;
    object-fit: cover;
    position: absolute;
    background-color: #ececec;
  }

  // @media only screen and (max-width: 768px) {
  //   width: 20%;
  // }
`;
