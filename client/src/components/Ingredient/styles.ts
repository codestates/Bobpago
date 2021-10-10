import styled from "styled-components";

interface CookerRecipeType {
  check: string;
}

export const CookerRecipeContainer = styled.div<CookerRecipeType>`
  /* flex: 8; */
  height: 50em;
  margin-bottom: 11em;
  // display: flex;
  // flex-wrap: wrap;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-columns: ${({ check }): any => {
    if (check === "Good") {
      return "repeat(6, 1fr)";
    } else {
      return "repeat(4, 1fr);";
    }
  }};
  overflow: ${({ check }): any => {
    if (check === "Good") {
      return "scroll";
    } else {
      return "auto";
    }
  }};
  overflow-x: ${({ check }): any => {
    if (check === "Good") {
      return "hidden";
    } else {
      return "auto";
    }
  }};
  @media only screen and (max-width: 768px) {
    grid-template-columns: repeat(4, 1fr);
  }
  @media only screen and (max-width: 480px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;
